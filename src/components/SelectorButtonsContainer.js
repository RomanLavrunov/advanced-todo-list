import { useState } from "react";
import { Button } from "./Button";
import { completedState } from "../redux/completedFilterSlice";
import { useDispatch } from "react-redux";

export const SelectorButtonsContainer = () => {
  const BUTTON_ID = {
    ALL: "ALL",
    COMPLETED: "COMPLETED",
    UNCOMPLETED: "UNCOMPLETED"
  };

  const BUTTON_STATE = {
    [BUTTON_ID.ALL]: "",
    [BUTTON_ID.COMPLETED]: true,
    [BUTTON_ID.UNCOMPLETED]: false
  };

  const [activeButtonId, set] = useState(BUTTON_ID.ALL);
  const dispatch = useDispatch();

  const handleClick = ({ target }) => {
    const { id } = target;
    set(() => id);
    dispatch(completedState(BUTTON_STATE[id]));
  };

  return (
    <div className="uppper-selector-buttons-container">
      <Button
        classes={`selector-buttons selector-buttons${
          activeButtonId === "ALL" ? "--clicked" : ""
        }`}
        buttonName={BUTTON_ID.ALL}
        handleClick={handleClick}
      />
      <Button
        classes={`selector-buttons selector-buttons${
          activeButtonId === "COMPLETED" ? "--clicked" : ""
        }`}
        buttonName={BUTTON_ID.COMPLETED}
        handleClick={handleClick}
      />
      <Button
        classes={`selector-buttons selector-buttons${
          activeButtonId === "UNCOMPLETED" ? "--clicked" : ""
        }`}
        buttonName={BUTTON_ID.UNCOMPLETED}
        handleClick={handleClick}
      />
    </div>
  );
};
