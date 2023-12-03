import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  dropStatus: null,
};
const dragAndDropSlice = createSlice({
  name: "dragAndDropSlice",
  initialState,
  reducers: {
    draggingStatus: (state, action) => {
      // console.log("Drag and Drop : ", action.payload);
      state.status = action.payload;
    },
    droppingStatus: (state, action) => {
      state.dropStatus = action.payload;
    },
  },
});
export const { draggingStatus, droppingStatus } = dragAndDropSlice.actions;
export default dragAndDropSlice.reducer;
