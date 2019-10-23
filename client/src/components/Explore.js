import React from "react";
import axios from "axios";
import party from "../images/party.jpg";
import styled from "styled-components";
import Search from './Search';
import Upcoming from "./Upcoming";
import { AuthConsumer } from "../providers/AuthProvider";
import { Link, } from "react-router-dom";
import { Card, } from "react-bootstrap";
import { Container, Button, Header, Segment, } from "semantic-ui-react";

class Explore extends React.Component {
  state = { events: [], page: 0 };

  componentDidMount() {
    const { auth: { user } } = this.props
    user ?
      axios.get(`/api/explore?page=${this.state.page}`)
        .then(res => {
          this.setState({ events: res.data })
        })
        .catch(err => {
          console.log(err)
        })
      :
      axios.get("/api/events")
        .then(res => {
          this.setState({ events: res.data })
        })
        .catch(err => {
          console.log(err)
        })
  };

  pageLeft = () => {
    const { auth: { user } } = this.props
    if (this.state.page > 0) {
      var next = this.state.page -1
      axios.get(`/api/explore?specificuserid=${user.id}&page=${next}`)
      .then(res => {
        this.setState({page: next, events: res.data})
      })
    }
  };

  pageRight = () => {
    const { auth: { user } } = this.props
    var next = this.state.page +1
    axios.get(`/api/explore?specificuserid=${user.id}&page=${next}`)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({page: next, events: res.data})
        }
      })
  };

  render() {
    return (
      <div>
        <div>
          <Button onClick={this.pageLeft} icon="left arrow"></Button>
          <p>{this.state.page + 1}</p>
          <Button onClick={this.pageRight} icon="right arrow"></Button>
        </div>
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