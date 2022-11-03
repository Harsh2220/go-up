import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allComments: null,
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    allComments: (state, action) => {
      state.allComments = action.payload;
    },
    addNewComment: (state, action) => {
      state.allComments = [...state.allComments, action.payload];
    },
  },
});

export const { allComments, addNewComment } = commentSlice.actions;

export default commentSlice.reducer;
