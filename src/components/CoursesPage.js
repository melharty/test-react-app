import React, { useState, useEffect } from "react";
import { getAuthors } from "../api/authorApi";
import courseStore from "../stores/courseStore";
import CourseList from "./CourseList";
import { Link } from "react-router-dom";
import { loadCourses } from "../actions/courseActions";

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    getAuthors().then((response) => {
      setAuthors(response);
    });
    if (courseStore.getCourses().length === 0) loadCourses();
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

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
