import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import { toast } from "react-toastify";
import * as authorActions from "../../actions/authorActions";
import authorStore from "../../stores/authorStore";

const ManageAuthorPage = (props) => {
  const [errors, setErrors] = useState({});
  const [authors, setAuthors] = useState(authorStore.getAuthors());
  const [author, setAuthor] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    authorStore.addChangeListener(onAuthorChange);
    if (authorStore.getAuthors().length === 0) authorActions.loadAuthors();

    const id = props.match.params.id;
    if (authors.length === 0) {
      authorActions.loadAuthors();
    } else if (id) {
      let idAuthor = authorStore.getAuthorById(id);
      if (!idAuthor) {
        props.history.push("/404");
      }
      setAuthor(idAuthor);
    }

    return () => {
      authorStore.removeChangeListener(onAuthorChange);
    };
  }, [props.match.params.id, authors.length, props.history]);

  const onAuthorChange = () => {
    setAuthors(authorStore.getAuthors());
  };

  const handleChange = ({ target }) => {
    setAuthor({
      ...author,
      [target.name]: target.value,
    });
  };

  const formIsValid = () => {
    const _errors = {};

    if (!author.name) _errors.name = "Author name is required";

    setErrors(_errors);

    // Form is valid if the error object has no properties
    return Object.keys(_errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formIsValid()) {
      return;
    }

    authorActions.saveAuthor(author).then(() => {
      toast.success("Author saved.");
      props.history.push("/authors");
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    props.history.push("/authors");
    authorActions.deleteAuthor(author.id).then(() => {
      toast.success("Author deleted.");
    });
  };

  return (
    <>
      <h2>Manage Author</h2>
      <AuthorForm
        author={author}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
      />
    </>
  );
};

export default ManageAuthorPage;
