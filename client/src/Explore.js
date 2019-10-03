import React from "react";
import Axios from "axios";

class Explore extends React.Component {
  state = {};

  componentDidMount() {
    Axios.get("/api/events")
      .then( res => {
        debugger
      })
      .catch( err => {
        debugger
      })
  }

  render() {
    return(
      <div>Explore</div>
    );
  };
};

export default Explore;