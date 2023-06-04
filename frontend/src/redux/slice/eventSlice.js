import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiURL } from '../../apiConfig';

export const createEvent = createAsyncThunk('event/createEvent', async (newForm) => {
  try {
    const options = { headers: { 'Content-Type': 'multipart/form-data' } };
    const data = await axios.post(`${apiURL}/event`, newForm, options);
    return data.event;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const getAllEvents = createAsyncThunk('event/getAllEvents', async (id) => {
  try {
    const { data } = await axios.get(`${apiURL}/event/all`);
    return data.events;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const getShopEvents = createAsyncThunk('event/getShopEvents', async (id) => {
  try {
    const { data } = await axios.get(`${apiURL}/event/all/${id}`);
    return data.shopEvents;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (id) => {
  try {
    const { data } = await axios.delete(`${apiURL}/event/${id}`, { withCredentials: true });
    return data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
});

const initialState = {
  isLoading: true,
};

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.event = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getAllEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(getAllEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(getShopEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getShopEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopEvents = action.payload;
      })
      .addCase(getShopEvents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
    builder
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.message = action.payload;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { reset } = eventSlice.actions;

export default eventSlice.reducer;
