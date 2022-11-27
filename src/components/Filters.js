import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "./Button";
import { resetFilterIcon } from "../shared/dataSet";
import { ToggleSource } from "./ToggleSource";
import { useDispatch } from "react-redux";
import { activeUser } from "../redux/usersSlice";

export const Filters = ({ resetFilters, userList, filterByUserNumber }) => {
  const [userNr, setUserNr] = useState("Select user:");
  const [display, setDisplay] = useState("none");
  const dispatch = useDispatch();

  const handleClick = (user) => {
    setUserNr(() => `User ${user}`);
    setDisplay(() => "none");
    filterByUserNumber(user);
    dispatch(activeUser(user));
  };

  window.addEventListener("click", (event) => {
    const value = event.target.className;
    if (typeof value !== "string") return;
    if (!value.includes("ripple")) return setDisplay(() => "none");
  });

  const handleDisplayStyle = (displayStyle) => {
    displayStyle === "none"
      ? setDisplay(() => "flex")
      : setDisplay(() => "none");
  };

  const resetAll = () => {
    setUserNr(() => "Select user:");
    setDisplay(() => "none");
    resetFilters("");
  };

  return (
    <div className="list-controls">
      <span className="list-name">TASK LIST</span>
      <ToggleSource />
      <div className="dropdown-list">
        <div className="button-container">
          <Button
            buttonName={userNr}
            classes="dropdown-button ripple"
            handleClick={() => handleDisplayStyle(display)}
          />
          <Button
            buttonName={resetFilterIcon}
            classes="reset-user-button ripple"
            handleClick={() => resetAll()}
          />
        </div>
        <ul className="user-id" style={{ display: display, list: "none" }}>
          <li>
            {userList?.map((user) => (
              <Button
                buttonName={`User ${user}`}
                key={user}
                classes="ripple user-button"
                handleClick={() => handleClick(user)}
              />
            ))}
          </li>
        </ul>
      </div>
    </div>
  );
};

Filters.propTypes = {
  resetFilters: PropTypes.func.isRequired,
  filterByUserNumber: PropTypes.func.isRequired,
  userList: PropTypes.array.isRequired
};
