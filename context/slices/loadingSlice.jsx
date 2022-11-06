import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const loadingSlice = createSlice({
  name: "isLoading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
