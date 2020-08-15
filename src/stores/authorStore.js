import { EventEmitter } from "events";
import dispatcher from "../appDispatcher";
import actionTypes from "../actions/actionTypes";

const CHANGE_EVENT = "change";
let _authors = [];

class AuthorStore extends EventEmitter {
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  getAuthors() {
    return _authors;
  }

  getAuthorById(authorId) {
    return _authors.find((a) => a.id === parseInt(authorId, 10));
  }

  deleteAuthor(authorId) {
    var index = _authors.findIndex((o) => {
      return o.id === authorId;
    });
    if (index !== -1) _authors.splice(index, 1);
  }
}

const store = new AuthorStore();

dispatcher.register((action) => {
  switch (action.actionType) {
    case actionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      store.emitChange();
      break;
    case actionTypes.LOAD_AUTHORS:
      _authors = action.authors;
      store.emitChange();
      break;
    case actionTypes.DELETE_AUTHOR:
      _authors = _authors.filter((a) => a.id !== action.id);
      store.emitChange();
      break;
    case actionTypes.UPDATE_AUTHOR:
      _authors = _authors.map((myAuthor) => {
        return myAuthor.id === action.author.id ? action.author : myAuthor;
      });
      break;
    default:
      break;
  }
});

export default store;
