import { createSlice } from "@reduxjs/toolkit";

export const sourceSlice = createSlice({
  name: "source",
  initialState: "both",
  reducers: {
    usedSource: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const selectSource = (state) => state.source;

export const { usedSource } = sourceSlice.actions;
export default sourceSlice.reducer;
