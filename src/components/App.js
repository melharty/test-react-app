import React from "react";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import Header from "./common/Header";
import CoursesPage from "./course/CoursesPage";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ManageCoursePage from "./course/ManageCoursePage";
import ManageAuthorPage from "./author/ManageAuthorPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthorsPage from "./author/AuthorPage";

function App() {
  return (
    <div className="container-fluid">
      <ToastContainer autoClose={3000} hideProgressBar />
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={CoursesPage} />
        <Route path="/course/:slug" exact component={ManageCoursePage} />
        <Route path="/course" exact component={ManageCoursePage} />
        <Route path="/authors" exact component={AuthorsPage} />
        <Route path="/author/:id" exact component={ManageAuthorPage} />
        <Route path="/author" exact component={ManageAuthorPage} />
        <Redirect from="/about-page" to="/about" />
        <Route path="/404" exact component={PageNotFound} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
