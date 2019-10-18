import React from "react";
import Axios from "axios";
import party from "../images/party.jpg";
import styled from "styled-components";
import Search from './Search';
import Upcoming from "./Upcoming";
import { AuthConsumer } from "../providers/AuthProvider";
import { Link, } from "react-router-dom";
import { Card, } from "react-bootstrap";
import { Container, Table, Header, Segment, } from "semantic-ui-react";

class Explore extends React.Component {
  state = { events: [], };

  componentDidMount() {
    const { auth: { user } } = this.props
    user ?
      Axios.get(`/api/explore?specificuserid=${user.id}`)
        .then(res => {
          this.setState({ events: res.data })
        })
        .catch(err => {
          console.log(err)
        })
      :
      Axios.get("/api/events")
        .then(res => {
          this.setState({ events: res.data })
        })
        .catch(err => {
          console.log(err)
        })
  };

  render() {
    return (
      <div>
        {this.state.events.map(e => (
          <Upcoming key={e.id} event={e} />
        ))}
      </div>
    )
  }
};

const ConnectedExplore = (props) => (
  <AuthConsumer>
    {auth =>
      <Explore {...props} auth={auth} />
    }
  </AuthConsumer>
);


export default ConnectedExplore;