import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import WhatsNext from "./WhatsNext";
import Upcoming from "./Upcoming";
import { Header, Container, } from 'semantic-ui-react';

class Home extends React.Component {
  state = { events: [], time: "", date: "", };

  componentDidMount() {
    this.ticker = setInterval( () => this.tick(), 1000)
  };

  tick = () => {
    this.setState({ time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString(), })
  };

  render() {
    return (
      <>
        <br />
        <p style={{ paddingLeft: "255px", color: "gray" }}>What's Next?</p>
        <p>{ this.state.date }  {this.state.time}</p>
        <WhatsNext props={{...this.state}} />
        <br />
        <p style={{ paddingLeft: "255px", color: "gray" }}>Upcoming Events.</p>
        <Upcoming />
      </>
    );
  };
};


export default Home;
