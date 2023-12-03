import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayAllTasks: true,
};

const importantTasks_or_AllTasks = createSlice({
  name: "importantOrAll",
  initialState,
  reducers: {
    showAllTasks: (state) => {
      state.displayAllTasks = true;
    },
    showImportantTasks: (state) => {
      state.displayAllTasks = false;
    },
  },
});

export const { showAllTasks, showImportantTasks } =
  importantTasks_or_AllTasks.actions;
export default importantTasks_or_AllTasks.reducer;
