import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  InputStatus: false,
};

const impTaskSlice = createSlice({
  name: "impTaskSlice",
  initialState,
  reducers: {
    toggleInputFocus: (state) => {
      state.InputStatus = !state.InputStatus;
    },
  },
});

export const { toggleInputFocus } = impTaskSlice.actions;
export default impTaskSlice.reducer;
