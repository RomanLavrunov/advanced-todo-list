import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TodoInputBlock } from "./TodoInputBlock";
import PropTypes from "prop-types";
import { getTodosAsync } from "../redux/todosSlice";

export const TodoList = ({ todos, onCheckBoxChange }) => {
  const styles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20vh"
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <div className="task-list-ul">
      <ul
        className="list"
        style={todos.length ? { listStyle: "none" } : styles}
      >
        {!todos.length && <div>Hooray...No todos left!</div>}
        {(todos &&
          todos.map((todo) => (
            <TodoInputBlock
              todo={todo}
              key={todo.id}
              onChange={onCheckBoxChange}
            />
          ))) || <></>}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  onCheckBoxChange: PropTypes.func.isRequired
};
