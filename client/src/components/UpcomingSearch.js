import React from "react";
import { Card } from "react-bootstrap";
import party from "../images/party.jpg";
import styled from "styled-components";
import { AuthConsumer } from "../providers/AuthProvider";
import { withRouter } from  'react-router-dom'

const UpcomingSearch = ({ event, history, onHide, clearEvents }) => {
  const handleClick = (e) => {
    e.preventDefault();
    clearEvents(e)
    onHide()
    history.push(`/events/${event.id}`)
    history.push(`/refresh`)
  }

  return (
    <Card onClick={handleClick} style={{ width: "213px", height: "120px" }} className="bg-dark text-white">
      <MyCardImage src={event.image || party} alt="event location" />
      <Card.ImgOverlay>
        <Card.Title><h2>{event.name || event.event_name}</h2></Card.Title>
        <br />
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