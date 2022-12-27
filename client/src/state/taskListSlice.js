import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: null,
  original: null,
};

const taskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    newTaskList: (state) => {
      state.original = null;
      state.taskList = {};
      state.taskList.title = "";
      state.taskList.status = "";
      state.taskList.description = "";
      state.taskList.tasks = [];
    },
    addToTaskList: (state, { payload: { task } }) => {
      state.taskList.tasks.push(task);
    },
    dropWipTaskList: (state) => {
      state.taskList = null;
    },
    setWipTaskList: (state, { payload: { taskList } }) => {
      state.taskList = taskList;
      state.original = taskList;
    },
    storeWipTaskList: (state, { payload: { taskList } }) => {
      state.taskList = taskList;
    },
  },
});

// reducer
export const taskListReducer = taskListSlice.reducer;
// actions creators
export const {
  newTaskList,
  addToTaskList,
  dropWipTaskList,
  setWipTaskList,
  storeWipTaskList,
} = taskListSlice.actions;
// selectors
export const selectWipTaskList = (state) => state.taskList.taskList;
export const selectOriginal = (state) => state.taskList.original;
