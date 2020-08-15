import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AuthorForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="needs-validation">
      <TextInput
        id="name"
        name="name"
        label="Name"
        author={props.author}
        onChange={props.onChange}
        error={props.errors.name}
        value={props.author.name}
      />

      <input
        type="submit"
        value="Save"
        className="btn btn-primary"
        onClick={props.onSubmit}
        onChange={props.onSubmit}
      />
      {"  "}
      {props.author && props.author.id && (
        <input
          type="button"
          value="Delete"
          className="btn btn-danger"
          onClick={props.onDelete}
        />
      )}
    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default AuthorForm;
