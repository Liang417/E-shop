import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../../apiConfig';

export const loadUser = createAsyncThunk('user/loadUser', async () => {
  try {
    const { data } = await axios.get(`${apiURL}/user/getUser`, { withCredentials: true });
    return data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const updateUser = createAsyncThunk('user/updateUser', async (updateData) => {
  try {
    const { data } = await axios.put(`${apiURL}/user/update`, updateData, {
      withCredentials: true,
    });
    return { user: data.user, success: 'Update successfully🙂' };
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const updateUserAvatar = createAsyncThunk('user/updateUserAvatar', async (avatar) => {
  try {
    const options = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };
    const { data } = await axios.put(`${apiURL}/user/update-avatar`, avatar, options);

    return data.user;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const updateUserAddress = createAsyncThunk(
  'user/updateUserAddress',
  async ({ country, city, address, zipCode, addressType }) => {
    try {
      const { data } = await axios.put(
        `${apiURL}/user/update-address`,
        { country, city, address, zipCode, addressType },
        { withCredentials: true }
      );
      return { user: data.user, success: 'Address added successfully🙂' };
    } catch (err) {
      throw new Error(err.response.data.message);
    }
  }
);

export const deleteUserAddress = createAsyncThunk('user/deleteUserAddress', async (id) => {
  try {
    const { data } = await axios.delete(`${apiURL}/user/delete-address/${id}`, {
      withCredentials: true,
    });
    return {
      user: data.user,
      success: 'Address deleted successfully🙂',
    };
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  error: null,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.isLoading = false;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.success = action.payload.success;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(updateUserAddress.pending, (state) => {
        state.isLoading = null;
      })
      .addCase(updateUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.success = action.payload.success;
      })
      .addCase(updateUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteUserAddress.pending, (state) => {
        state.isLoading = null;
      })
      .addCase(deleteUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.success = action.payload.success;
      })
      .addCase(deleteUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
