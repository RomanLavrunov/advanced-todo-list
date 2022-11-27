import React, { useState } from "react";
import { RadioInput } from "./RadioInput";
import { usedSource, selectSource } from "../redux/sourceSlice";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

export const ToggleSource = () => {
  const [activeSource, setActiveSource] = useState("both");

  const dispatch = useDispatch();
  const selectedSource = useSelector(selectSource, shallowEqual);

  const handleChange = (event) => {
    setActiveSource(() => event.target.value);
  };

  const handleSpanClick = (source) => {
    setActiveSource(() => source);
    dispatch(usedSource(source));
  };

  return (
    <div className="switcher">
      <RadioInput
        source="users"
        checked={"users" === selectedSource}
        handleChange={handleChange}
        handleSpanClick={handleSpanClick}
      />
      <RadioInput
        source="both"
        checked={"both" === selectedSource}
        handleChange={handleChange}
        handleSpanClick={handleSpanClick}
      />
      <RadioInput
        source="api"
        checked={"api" === selectedSource}
        handleChange={handleChange}
        handleSpanClick={handleSpanClick}
      />
      <span className="switcher-toggle"></span>
    </div>
  );
};
