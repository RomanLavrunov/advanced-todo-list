import PropTypes from "prop-types";

export const RadioInput = ({
  source,
  checked,
  handleChange,
  handleSpanClick
}) => {
  return (
    <>
      <input
        type="radio"
        checked={checked}
        onChange={(event) => handleChange(event)}
        className={`switcher-input switcher-input--${source}`}
      />
      <label onClick={() => handleSpanClick(source)} className="switcher-label">
        {source}
      </label>
    </>
  );
};

RadioInput.propTypes = {
  source: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSpanClick: PropTypes.func.isRequired
};
