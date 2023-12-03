import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  editStatus: null,
  editTaskData: "",
  editIndexTask: null,
};

const editSlice = createSlice({
  name: "edit",
  initialState,
  reducers: {
    editModeTask: (state, action) => {
      // console.log("Edit Mode Status ", action.payload);
      state.editStatus = action.payload;
    },
    editModeTaskData: (state, action) => {
      state.editTaskData = action.payload;
    },
    editIndex: (state, action) => {
      state.editIndexTask = action.payload;
    },
    editModeTaskRemove: (state) => {
      // console.log("Edit Mode Status Null");
      state.editStatus = null;
    },
  },
});

export const { editModeTask, editModeTaskData, editIndex, editModeTaskRemove } =
  editSlice.actions;
export default editSlice.reducer;
