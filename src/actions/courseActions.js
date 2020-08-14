import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function deleteCourse(courseId) {
  courseApi.deleteCourse(courseId).then((response) => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      payload: response,
    });
  });
}

export function loadCourses() {
  courseApi.getCourses().then((loadedCourses) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: loadedCourses,
    });
  });
}
