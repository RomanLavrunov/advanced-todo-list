import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./Button";
import { editButtonIcon, deleteButtonIcon } from "../shared/dataSet";
import { deleteTodo, editTodos } from "../redux/todosSlice";
import PropTypes from "prop-types";

export const TodoInputBlock = ({ todo, onChange }) => {
  const todoInputField = useRef(todo.id);
  const dispatch = useDispatch();

  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [isClicked, setIsClicked] = useState(false);

  const spanStyle = {
    padding: `${
      todo.userId > 9 ? "0rem 0.2rem 0rem 0rem" : "0rem 0.7rem 0rem 0rem"
    }`
  };

  const handleEditClick = () => {
    if (todo.completed) return;

    isClicked === false
      ? todoInputField.current.focus()
      : todoInputField.current.blur();
    setIsClicked(() => !isClicked);
  };

  const handleInputChange = (event) => {
    let title = event.target.value;
    setTodoTitle(() => title);
    let id = todo.id;
    dispatch(
      editTodos({
        title: title,
        id: id
      })
    );
  };

  const classChange = todo.completed
    ? "modificators"
    : !isClicked
    ? "modificators active-mode"
    : "modificators active-area-glow";

  const deleteTask = (todo) => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className="task-container" style={{ display: "flex" }}>
      <div className="todo-inputs">
        <input
          type="checkbox"
          onChange={() => onChange(todo.id)}
          checked={todo.completed}
        />
        <span className="new-span">
          <input
            id={todo.id}
            ref={todoInputField}
            type="text"
            className={
              todo.completed
                ? "task-input-edit strike"
                : !isClicked
                ? "task-input-edit"
                : "task-input-edit active-area-glow"
            }
            value={todoTitle}
            readOnly={!isClicked}
            onChange={handleInputChange}
            onBlur={() => setIsClicked(false)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;
              setIsClicked(() => false);
            }}
          />
        </span>
      </div>
      <div className="modify-input-buttons">
        <Button
          buttonName={editButtonIcon}
          classes={classChange}
          handleClick={() => handleEditClick()}
        />
        <Button
          buttonName={deleteButtonIcon}
          classes="modificators delete-button"
          handleClick={() => deleteTask(todo)}
        />
      </div>
      <span
        className="user-id-todo-text "
        style={spanStyle}
      >{`User ID:${todo.userId}`}</span>
      <span className="user-list-mark ">
        {todo.source === "api" ? "A" : "U"}
      </span>
    </div>
  );
};

TodoInputBlock.propTypes = {
  todo: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
