import { useState } from "react";
import { Button } from "./Button";
import PropTypes from "prop-types";

export const AddTodoElement = ({ onSubmit }) => {
  const [value, setValue] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      onSubmit(value);
    }
    setValue("");
  };
  return (
    <form className="to-do-form" onSubmit={handleSubmit}>
      <div className="task-input-bar">
        <input
          type="text"
          className="new-task-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <Button
          buttonName="+"
          classes="add-task-button"
          type="submit"
          handleClick={handleSubmit}
        />
      </div>
    </form>
  );
};

AddTodoElement.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
