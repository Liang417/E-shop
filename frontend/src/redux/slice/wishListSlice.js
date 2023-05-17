import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addToWishList = createAsyncThunk('wish/addToWishList', async (data, { getState }) => {
  const state = getState();
  const { wishLists } = state.wishList;
  const isItemExist = wishLists.find((wishListItem) => wishListItem._id === data._id);
  if (isItemExist) {
    return wishLists.map((wishListItem) => (wishListItem._id === data._id ? data : wishListItem));
  } else {
    return [...wishLists, data];
  }
});

export const removeFromWishList = createAsyncThunk(
  'wish/removeFromWishList',
  async (data, { getState }) => {
    const state = getState();
    const { wishLists } = state.wishList;
    return wishLists.filter((wishListItem) => wishListItem._id !== data._id);
  }
);

const initialState = {
  wishLists: localStorage.getItem('wishListItems')
    ? JSON.parse(localStorage.getItem('wishListItems'))
    : [],
};

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishList.fulfilled, (state, action) => {
        state.wishLists = action.payload;
        localStorage.setItem('wishListItems', JSON.stringify(action.payload));
      })
      .addCase(removeFromWishList.fulfilled, (state, action) => {
        state.wishLists = action.payload;
        localStorage.setItem('wishListItems', JSON.stringify(action.payload));
      });
  },
});

export default wishListSlice.reducer;
