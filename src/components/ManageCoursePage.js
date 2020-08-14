import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { getAuthors } from "../api/authorApi";
import { toast } from "react-toastify";
import courseStore from "../stores/courseStore";
import * as courseActions from "../actions/courseActions";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});

  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    cateogry: "",
  });

  const [authors, setAuthors] = useState([
    {
      id: null,
      name: "",
    },
  ]);

  useEffect(() => {
    getAuthors().then((response) => {
      setAuthors(response);
    });

    const slug = props.match.params.slug;
    if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
  }, [props.match.params.slug]);

  const handleChange = ({ target }) => {
    setCourse({
      ...course,
      [target.name]: target.value,
    });
  };

  const formIsValid = () => {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);

    // Form is valid if the error object has no properties
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }

    courseActions.saveCourse(course).then(() => {
      toast.success("Course saved.");
      props.history.push("/courses");
    });
  };

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        course={course}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        authors={authors}
      />
    </>
  );
};

export default ManageCoursePage;
