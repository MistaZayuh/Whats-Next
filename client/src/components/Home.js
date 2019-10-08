import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import WhatsNext from "./WhatsNext";
import Upcoming from "./Upcoming";
import {AuthConsumer} from "../providers/AuthProvider"
import { Header, Container, } from 'semantic-ui-react';
import Search from "./Search";

class Home extends React.Component {
  state = { events: [], nextEvent: {}, };

  searchEvent = (e, search) => {
    e.preventDeafult()

    axios.get(`api/events?column=${this.state.colum}&searc=${search}`)
      .then(res => {
        this.setState({ events: res.data })
      })
  }

  componentDidMount() {
    const {auth: {user}} = this.props
    axios.get(`/api/specific_user_events?specificuserid=${user.id}`)
      .then(res => {
        this.setState({ events: res.data, nextEvent: res.data[0], })
      })
      .catch(err => { 
        console.log(err)
      })
  };

  render() {
    return (
      <>
        <br />
        <p style={{ paddingLeft: "255px", color: "gray" }}>What's Next?</p>
        <WhatsNext nextEvent={this.state.nextEvent} />
        <br />
        <p style={{ paddingLeft: "255px", color: "gray" }}>Upcoming Events.</p>
        <Upcoming />
      </>
    );
  };
};

const ConnectedHome = (props) => (
  <AuthConsumer>
    {auth =>
    <Home {...props} auth={auth} /> 
    }
  </AuthConsumer>
)


export default ConnectedHome;
