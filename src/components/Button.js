import PropTypes from "prop-types";

export const Button = ({ buttonName, handleClick, classes }) => {
  return (
    <button id={buttonName} className={classes} onClick={handleClick}>
      {buttonName}
    </button>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.string
};
