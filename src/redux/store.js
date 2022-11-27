import { configureStore } from "@reduxjs/toolkit";
import { logger } from "redux-logger";
import allTodosReducer from "./todosSlice.js";
import usersReducer from "./usersSlice.js";
import sourceReducer from "./sourceSlice.js";
import completedFilterReducer from "./completedFilterSlice.js";
import { saveTodos, loadTodos } from "../shared/utilities.js";

const defaultState = {
  allTodos: {
    todos: loadTodos(),
    sortedTodos: [],
    apiTodos: [],
    isLoading: false,
    hasError: false
  },
  users: {
    completeUsersList: [],
    selectedID: ""
  },
  source: "both",
  completed: ""
};

export const store = configureStore({
  reducer: {
    allTodos: allTodosReducer,
    users: usersReducer,
    source: sourceReducer,
    completed: completedFilterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: defaultState
});

store.subscribe(() => {
  saveTodos(store.getState().allTodos.todos);
});
