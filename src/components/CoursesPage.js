import React, { useState, useEffect } from "react";
import { getCourses } from "../api/courseApi";
import CourseList from "./CourseList";

function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCourses().then((response) => {
      setCourses(response);
      setLoading(false);
    });
  }, []);

  return (
    !isLoading && (
      <>
        <h2>Courses</h2>
        {/* <LoadBody isLoading={isLoading} courses={courses} /> */}
        <CourseList courses={courses} />
      </>
    )
  );
}

const Loading = () => {
  return <h2>Loading ...</h2>;
};

const Loaded = (props) => {
  return <CourseList courses={props.courses} />;
};

const LoadBody = (props) => {
  const isLoading = props.isLoading;
  if (isLoading) {
    return <Loading />;
  } else {
    return <Loaded />;
  }
};

export default CoursesPage;
