import React, { useState, useEffect } from "react";
import courseStore from "../stores/courseStore";
import authorStore from "../stores/authorStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses } from "../actions/courseActions";
import { loadAuthors } from "../actions/authorActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState(authorStore.getAuthors());

  useEffect(() => {
    courseStore.addChangeListener(onCourseChange);
    authorStore.addChangeListener(onAuthorChange);
    if (courseStore.getCourses().length === 0) loadCourses();
    if (authorStore.getAuthors().length === 0) loadAuthors();
    return () => {
      courseStore.removeChangeListener(onCourseChange);
      authorStore.removeChangeListener(onAuthorChange);
    };
  }, []);

  const onCourseChange = () => {
    setCourses(courseStore.getCourses());
  };

  const onAuthorChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  return (
    <>
      <h2>Courses</h2>
      <Link className="btn btn-primary" to="/course">
        Add Course
      </Link>
      {authors && authors.length > 0 && courses && courses.length > 0 && (
        <CourseList courses={courses} authors={authors} />
      )}
    </>
  );
}

export default CoursesPage;
