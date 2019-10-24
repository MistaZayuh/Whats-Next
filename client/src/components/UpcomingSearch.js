import React, { useEffect, } from "react";
import moment from "moment";
import { Header, Card, CardGroup, CardDeck, } from "react-bootstrap";
import building from "../images/building.jpeg";
import party from "../images/party.jpg";
import styled from "styled-components";
import axios from 'axios';
import { AuthConsumer } from "../providers/AuthProvider";
import { withRouter } from  'react-router-dom'

const UpcomingSearch = ({ event, history, onHide, clearEvents }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onHide()
    history.push(`/events/${event.id}`)
    // history.push(`/refresh`)
  }

  return (
    <Card onClick={handleClick} style={{ width: "213px", height: "120px" }} className="bg-dark text-white">
      <MyCardImage src={event.image || party} alt="event location" />
      <Card.ImgOverlay>
        <Card.Title>{event.name || event.event_name}</Card.Title>
        <br />
        <Card.Text>{moment(event.date).format("ll, h:mm a")}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

const ConnectedUpcomingSearch = (props) => (
  <AuthConsumer>
    {auth =>
      <UpcomingSearch {...props} auth={auth} />
    }
  </AuthConsumer>
)

const MyCardImage = styled(Card.Img)`
    width: 200px;
    height: 120px;
    filter: blur(2.5px) brightness(60%);
`;

export default withRouter(ConnectedUpcomingSearch);