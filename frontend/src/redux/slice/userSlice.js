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
    clearErrors: (state) => {
      state.error = null;
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
        state.error = action.error.message;
      });
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice.reducer;
