import dispatcher from "../appDispatcher";
import * as authorApi from "../api/authorApi";
import actionTypes from "./actionTypes";

export function saveAuthor(author) {
  return authorApi.saveAuthor(author).then((savedAuthor) => {
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_AUTHOR,
      author: savedAuthor,
    });
  });
}

export function deleteAuthor(authorId) {
  authorApi.deleteAuthor(authorId).then((response) => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_AUTHOR,
      payload: response,
    });
  });
}

export function loadAuthors() {
  authorApi.getAuthors().then((loadedAuthors) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors: loadedAuthors,
    });
  });
}
