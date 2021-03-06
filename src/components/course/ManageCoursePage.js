import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import { toast } from "react-toastify";
import courseStore from "../../stores/courseStore";
import * as courseActions from "../../actions/courseActions";
import * as authorActions from "../../actions/authorActions";
import authorStore from "../../stores/authorStore";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    cateogry: "",
  });

  useEffect(() => {
    courseStore.addChangeListener(onCourseChange);
    authorStore.addChangeListener(onAuthorChange);
    if (authorStore.getAuthors().length === 0) authorActions.loadAuthors();

    const slug = props.match.params.slug;
    if (courses.length === 0) {
      courseActions.loadCourses();
    } else if (slug) {
      let slugCourse = courseStore.getCourseBySlug(slug);
      if (!slugCourse) {
        props.history.push("/404");
      }
      setCourse(slugCourse);
    }

    return () => {
      authorStore.removeChangeListener(onAuthorChange);
      courseStore.removeChangeListener(onCourseChange);
    };
  }, [props.match.params.slug, courses.length, props.history]);

  const onAuthorChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  const onCourseChange = () => {
    setCourses(courseStore.getCourses());
  };

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

  const handleDelete = (event) => {
    event.preventDefault();
    props.history.push("/courses");
    courseActions.deleteCourse(course.id).then(() => {
      toast.success("Course deleted.");
      return;
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
        onDelete={handleDelete}
        authors={authors}
      />
    </>
  );
};

export default ManageCoursePage;
