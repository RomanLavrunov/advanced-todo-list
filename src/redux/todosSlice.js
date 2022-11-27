import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userIdRandomizer, idGenerator } from "../shared/utilities";

export const getTodosAsync = createAsyncThunk(
  "apiTodos/getTodosAsync",
  async () => {
    try {
      let response = await fetch("https://jsonplaceholder.typicode.com/todos/");
      let apitodos = await response.json();

      return { apitodos };
    } catch (error) {
      console.log(error);
    }
  }
);

export const allTodosSlice = createSlice({
  name: "allTodos",
  initialState: {
    todos: [],
    sortedTodos: [],
    apiTodos: [],
    isLoading: false,
    hasError: false
  },
  reducers: {
    addTodo: (state, action) => {
      const todoObject = {
        userId: userIdRandomizer(),
        id: idGenerator(),
        completed: false,
        source: "users",
        title: action.payload
      };
      state.todos.unshift(todoObject);
      //state.todos = [todoObject, ...state.todos];
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      state.sortedTodos = state.sortedTodos.filter(
        (todo) => todo.id !== action.payload
      );
    },
    editTodos: (state, action) => {
      state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.title = action.payload.title;
        }
        return todo;
      });
    },
    toggleCheckbox: (state, action) => {
      state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      state.sortedTodos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    },
    filterTodos: (state, action) => {
      const filteredByUser =
        action.payload.USERID !== ""
          ? state.todos.filter(
              (todo) => todo.userId === action.payload.USERID
            ) || []
          : state.todos;
      const filteredByCompletion =
        action.payload.COMPLETED === ""
          ? filteredByUser
          : filteredByUser.filter(
              (todo) => todo.completed === action.payload.COMPLETED
            ) || [];

      state.sortedTodos =
        action.payload.SOURCE === "both"
          ? filteredByCompletion
          : filteredByCompletion.filter(
              (todo) => todo.source === action.payload.SOURCE
            ) || [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodosAsync.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getTodosAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hasError = false;

        const apiTodos = action.payload.apitodos.map((object) => {
          return { ...object, source: "api" };
        });

        const missingApiTodos = apiTodos.filter(
          ({ id: id1 }) => !state.todos.some(({ id: id2 }) => id2 === id1)
        );

        const savedUserTodos = [],
          updatedApiTodos = missingApiTodos;

        state.todos.forEach((todo) => {
          if (todo.source !== "api") {
            savedUserTodos.push(todo);
          } else {
            updatedApiTodos.push(todo);
          }
        });

        updatedApiTodos.sort((a, b) => a.userId - b.userId);

        state.todos = [...savedUserTodos, ...updatedApiTodos];
      })
      .addCase(getTodosAsync.rejected, (state) => {
        state.isLoading = false;
        state.hasError = true;
      });
    // .addCase(addTodoAsync.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.hasError = false;
    //   state.todos.push(action.payload.todo)
    // })
    // .addCase(toggleCompleteAsync.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.hasError = false;
    //   const index = state.findIndex(
    //     (todo) => todo.id === action.payload.todo.id
    //   );
    //   state[index].completed = action.payload.todo.completed;
    // })
    // .addCase(deleteTodoAsync.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.hasError = false;
    //   return state.filter((todo) => todo.id !== action.payload.id);
    // });
  }
});

export const selectAllTodos = (state) => state.allTodos.todos;
export const selectSortedTodos = (state) => state.allTodos.sortedTodos;

export const {
  addTodo,
  deleteTodo,
  editTodos,
  toggleCheckbox,
  filterTodos
} = allTodosSlice.actions;
export default allTodosSlice.reducer;
