import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProjects: null,
};

export const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    allProjects: (state, action) => {
      state.allProjects = action.payload;
    },
  },
});

export const { allProjects } = projectSlice.actions;

export default projectSlice.reducer;
