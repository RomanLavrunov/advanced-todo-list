import "./styles.css";
import "./toggle.css";
import React, { useEffect } from "react";
import { SelectorButtonsContainer } from "./components/SelectorButtonsContainer";
import { Filters } from "./components/Filters";
import { TodoList } from "./components/TodoList";
import { AddTodoElement } from "./components/AddTodoElement";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  addTodo,
  toggleCheckbox,
  selectAllTodos,
  filterTodos,
  selectSortedTodos
} from "./redux/todosSlice";
import {
  users,
  selectAllUsers,
  selectUser,
  activeUser
} from "./redux/usersSlice";
import { usedSource, selectSource } from "./redux/sourceSlice";
import {
  completedState,
  selectCompletedState
} from "./redux/completedFilterSlice";

export default function App() {
  const dispatch = useDispatch();
  let allTodos = useSelector(selectAllTodos, shallowEqual);
  let sortedTodos = useSelector(selectSortedTodos, shallowEqual);
  let SOURCE = useSelector(selectSource, shallowEqual);
  let USERID = useSelector(selectUser, shallowEqual);
  let COMPLETED = useSelector(selectCompletedState, shallowEqual);

  const defaultState = USERID === "" && SOURCE === "both" && COMPLETED === "";

  function checkBoxCheck(id) {
    dispatch(toggleCheckbox(id));
  }

  const addTodos = (title) => {
    dispatch(addTodo(title));
    resetFilters();
  };

  const filterByUserNumber = () => USERID;

  const resetFilters = () => {
    dispatch(activeUser(""));
    dispatch(usedSource("both"));
    dispatch(completedState(""));
  };

  let userIds = useSelector(selectAllUsers, shallowEqual);

  useEffect(() => {
    dispatch(users(allTodos));
  }, [allTodos]);

  useEffect(() => {
    dispatch(filterTodos({ USERID, SOURCE, COMPLETED }));
  }, [USERID, SOURCE, COMPLETED]);

  return (
    <div className="App">
      <SelectorButtonsContainer />
      <AddTodoElement onSubmit={addTodos} />
      <Filters
        userList={userIds}
        filterByUserNumber={filterByUserNumber}
        resetFilters={resetFilters}
      />
      <TodoList
        todos={!defaultState ? sortedTodos : allTodos}
        onCheckBoxChange={checkBoxCheck}
      />
    </div>
  );
}
