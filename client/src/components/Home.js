import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import WhatsNext from "./WhatsNext";
import Upcoming from "./Upcoming";
import { Link, } from "react-router-dom";
import { AuthConsumer } from "../providers/AuthProvider";
import { Header, Container, } from 'semantic-ui-react';
import { CardGroup, CardDeck } from 'react-bootstrap';
import "../styles/Home.css";

class Home extends React.Component {
  state = { events: null, nextEvent: {}, };

  componentDidMount() {
    const { auth: { user } } = this.props
    axios.get(`/api/accepted_user_events?specificuserid=${user.id}`)
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
    const {events, nextEvent} = this.state;
    if (events !== null) {var eventList = events.slice([1])}
    return (
      <>
        {events ?
          <Container>
            <br />
            <div className="whats-next-div">
              <div className="whats-next-p">
                <p style={{ color: "grey" }}>What's Next?</p>
              </div>
            </div>
            <WhatsNext nextEvent={nextEvent} />
            <br />
            <br />
            <div className="upcoming-events-div">
            <div className="upcoming-events-p">
            <p style={{color: "grey"}}>What's Coming Up?</p>
            </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ alignItems: "center", width: "700px", height: "250px", justifyContent: "center" }}>
                <CardDeck>
                  {eventList.map(e => (
                    <Upcoming
                    key={e.id}
                    event={e}
                    />
                    ))}
                </CardDeck>
                <br />
              </div>
            </div>

          </Container>
          :
          <Container>
            <Header as="h1">It looks like you aren't attending any upcoming events.</Header>
            <Header as="h2">"Why don't you check out the
             <Link to="/explore"> explore page   </Link>
              and find one."</Header>
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
