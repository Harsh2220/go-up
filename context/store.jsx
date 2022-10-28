import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/userSlice";
import allProjectsReducer from "./slices/projectSlice";
import allCommentsReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    userData: currentUserReducer,
    projectsData: allProjectsReducer,
    commentsData: allCommentsReducer,
  },
});
