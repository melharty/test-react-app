import React from "react";
import { Link } from "react-router-dom";

class AboutPage extends React.Component {
  render() {
    return (
      <>
        <h2>About</h2>
        <p>This app uses React.</p>
        <Link to="/">Homepage</Link>
      </>
    );
  }
}

export default AboutPage;
