import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import WhatsNext from "./WhatsNext";
import Upcoming from "./Upcoming";
import { AuthConsumer } from "../providers/AuthProvider"
import { Header, Container, } from 'semantic-ui-react';
import Search from "./Search";

class Home extends React.Component {
  state = { events: null, nextEvent: {}, };

  componentDidMount() {
    const { auth: { user } } = this.props
    axios.get(`/api/specific_user_events?specificuserid=${user.id}`)
      .then(res => {
        if (res.data.length !== 0) {
          this.setState({ events: res.data, nextEvent: res.data[0], })
        }
      })
      .catch(err => {
        console.log(err)
      })
  };

  render() {
    var exploreLink = <a href="/explore">explore page</a>
    return (
      <>
        {this.state.events ?
          <Container>
            <br />
            <p style={{ paddingLeft: "255px", color: "gray" }}>What's Next?</p>
            <WhatsNext nextEvent={this.state.nextEvent} />
            <br />
            <p style={{ paddingLeft: "255px", color: "gray" }}>Upcoming Events.</p>
            <Upcoming />
          </Container>
          :
          <Container>
            <Header as="h1">It looks like you aren't attending any events.</Header>
            <Header as="h2">{"Why don't you check out the " + exploreLink + " and find one you fucking loser"}</Header>
          </Container>
        }
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
