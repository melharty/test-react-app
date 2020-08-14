import React from "react";
import PropTypes from "prop-types";

const SelectInput = (props) => {
  let wrapperClass = "form-group";
  if (props.error.length > 0) {
    wrapperClass += " has-error";
  }
  let formClass = "form-control";
  if (props.error.length > 0) {
    formClass += " is-invalid";
  }
  return (
    <div className={wrapperClass}>
      <label
        htmlFor={props.id}
        className={props.error.length > 0 && "text-danger"}
      >
        {props.label}
      </label>
      <div className="field">
        <select
          id={props.id}
          name={props.name}
          onChange={props.onChange}
          className={formClass}
          value={props.course.authorId || ""}
        >
          <option value=""></option>
          {props.authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>
      {props.error.length > 0 && (
        <div className="text-danger">{props.error}</div>
      )}
    </div>
  );
};

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  authors: PropTypes.array.isRequired,
};

SelectInput.defaultProps = {
  error: "",
  authors: [],
};

export default SelectInput;
