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
    addNewProject: (state, action) => {
      state.allProjects = [...state.allProjects, action.payload];
    },
  },
});

export const { allProjects, addNewProject } = projectSlice.actions;

export default projectSlice.reducer;
