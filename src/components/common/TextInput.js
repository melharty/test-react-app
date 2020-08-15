import React from "react";
import PropTypes from "prop-types";

const TextInput = (props) => {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  let formClass = "form-control";
  if (props.error.length > 0) {
    formClass += " is-invalid";
  }
  let labelClass = "";
  if (props.error.length > 0) {
    labelClass += "text-danger";
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id} className={labelClass}>
        {props.label}
      </label>
      <div className="field">
        <input
          id={props.id}
          type="text"
          name={props.name}
          className={formClass}
          value={props.value || ""}
          onChange={props.onChange}
        />
      </div>
      {/* {props.error.length > 0 && (
        <div className="alert alert-danger">{props.error}</div>
      )} */}
      {props.error.length > 0 && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
};

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
};

TextInput.defaultProps = {
  error: "",
};

export default TextInput;
