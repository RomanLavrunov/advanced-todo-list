import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: { completeUsersList: [], selectedID: "" },
  reducers: {
    users: (state, action) => {
      let userIDs = [];
      if (action.payload.length) {
        action.payload.forEach((object) => {
          if (userIDs.indexOf(object.userId) === -1)
            userIDs.push(object.userId);
        });
      }
      state.completeUsersList = userIDs.sort((a, b) => a - b);
    },
    activeUser: (state, action) => {
      state.selectedID = action.payload;
    }
  }
});

export const selectAllUsers = (state) => state.users.completeUsersList;
export const selectUser = (state) => state.users.selectedID;

export const { users, activeUser } = usersSlice.actions;
export default usersSlice.reducer;

// function uploadMissingTasks(todos,apiTodos) {

//   const results = apiTodos.filter(
//     ({ id: id1 }) => todos.some(({ id: id2 }) => id2 !== id1)
//   );

//   const user= todos.filter((todo) => todo.source !== "api") || [];
//   const api = todos.filter((todo) => todo.source === "api") || [];

//   const updatedApiTodos = [...api, ...results];
//   updatedApiTodos.sort((a, b) => a.userId - b.userId);

//   return [...user, ...updatedApiTodos];
// }
