import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
  return courseApi.saveCourse(course).then((savedCourse) => {
    dispatcher.dispatch({
      actionType: course.id
        ? actionTypes.UDPATE_COURSE
        : actionTypes.CREATE_COURSE,
      course: savedCourse,
    });
  });
}

export function deleteCourse(courseId) {
  return courseApi.deleteCourse(courseId).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_COURSE,
      courseId: courseId,
    });
  });
}

export function loadCourses() {
  return courseApi.getCourses().then((loadedCourses) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_COURSES,
      courses: loadedCourses,
    });
  });
}
