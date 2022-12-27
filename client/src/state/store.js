import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice.js";
import {
  feladatOKApiSlice,
  feladatOKApiSliceReducer,
} from "./feladatOKApiSlice.js";
import { taskListReducer } from "./taskListSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    taskList: taskListReducer,
    [feladatOKApiSlice.reducerPath]: feladatOKApiSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feladatOKApiSlice.middleware),
});
