import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function CourseList(props) {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author ID</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {props.courses.map((courses) => {
          return (
            <tr key={courses.id}>
              <td>
                <Link to={"/course/" + courses.slug}>{courses.title}</Link>
              </td>
              <td>{courses.authorId}</td>
              <td>{courses.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      cateogry: PropTypes.string.isRequired,
    })
  ).isRequired,
};

CourseList.defaultProps = {
  courses: [],
};

export default CourseList;