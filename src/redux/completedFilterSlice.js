import { createSlice } from "@reduxjs/toolkit";

export const completedFilterSlice = createSlice({
  name: "completedTodos",
  initialState: "",
  reducers: {
    completedState: (state, action) => {
      return (state = action.payload);
    }
  }
});

export const selectCompletedState = (state) => state.completed;

export const { completedState } = completedFilterSlice.actions;
export default completedFilterSlice.reducer;
