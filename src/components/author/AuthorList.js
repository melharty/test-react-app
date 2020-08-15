import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AuthorList(props) {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Author Name</th>
        </tr>
      </thead>
      <tbody>
        {props.authors.map((author) => {
          return (
            <tr key={author.id}>
              <td>
                <Link to={"/author/" + author.id}>{author.id}</Link>
              </td>
              <td>
                <Link to={"/author/" + author.id}>{author.name}</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

AuthorList.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

AuthorList.defaultProps = {
  authors: [],
};

export default AuthorList;
