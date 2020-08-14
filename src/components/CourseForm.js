import React from "react";
import PropTypes from "prop-types";
import TextInput from "./common/TextInput";
import SelectInput from "./common/SelectInput";

const CourseForm = (props) => {
  return (
    <form onSubmit={props.onSubmit} className="needs-validation">
      <TextInput
        id="title"
        name="title"
        label="Title"
        course={props.course}
        onChange={props.onChange}
        error={props.errors.title}
      />

      <SelectInput
        id="author"
        name="authorId"
        label="Author"
        course={props.course}
        onChange={props.onChange}
        error={props.errors.authorId}
        authors={props.authors}
      />

      <TextInput
        id="category"
        name="category"
        label="Category"
        course={props.course}
        onChange={props.onChange}
        error={props.errors.category}
      />

      <input
        type="submit"
        value="Save"
        className="btn btn-primary"
        onClick={props.onSubmit}
        onChange={props.onSubmit}
      />
    </form>
  );
};

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default CourseForm;
