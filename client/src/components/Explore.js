import React from "react";
import Axios from "axios";
import party from "../images/party.jpg";
import styled from "styled-components";
import Upcoming from "./Upcoming";
import { AuthConsumer} from "../providers/AuthProvider";
import Search from './Search';
import { Link, } from "react-router-dom";
import { Card, CardDeck, } from "react-bootstrap";
import { Container, } from "semantic-ui-react";

class Explore extends React.Component {
  state = { events: [], };

  componentDidMount() {
    this.props.auth.user ?
    Axios.get(`/api/explore_events`)
      .then(res => {
        debugger
        this.setState({ events: res.data, })
      })
      .catch(err => {
        debugger
        console.log(err)
      })
    :
    Axios.get("/api/events")
      .then(res => {
        debugger
        this.setState({ events: res.data})
      })
      .catch(err => {
        debugger
        console.log(err)
      })
  }

  render() {
    const { events } = this.state
    return (
      <Container>
        <CardDeck>

          {events.map(e => (
            <Upcoming key={e.event_id} event={e} />
          ))}
        </CardDeck>
      </Container>
    )
  }
}

const ConnectedExplore = (props) => (
  <AuthConsumer>
    {auth =>
      <Explore {...props} auth={auth} />
    }
  </AuthConsumer>
)

const MyCardImage = styled(Card.Img)`
    width: 200px;
    height: 100px;
    filter: blur(2.5px) brightness(60%);
`;

export default ConnectedExplore;