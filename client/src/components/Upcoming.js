import React, { useEffect, } from "react";
import moment from "moment";
import { Header, Card, CardGroup, CardDeck, } from "react-bootstrap";
import { Link, } from "react-router-dom";
import building from "../images/building.jpeg";
import party from "../images/party.jpg";
import styled from "styled-components";


const Upcoming = ({ event }) => (
	<Link to={`/events/${event.id}`}>
		<Card style={{ width: "213px", height: "120px" }} className="bg-dark text-white">
			<MyCardImage src={event.image || party} alt="event location" />
			<Card.ImgOverlay>
				<Card.Title>{event.name}</Card.Title>
				<br />
				<Card.Text>{moment(event.date).format("LLLL")}</Card.Text>
			</Card.ImgOverlay>
		</Card>
		<br />
	</Link>
)


const MyCardImage = styled(Card.Img)`
    width: 200px;
    height: 120px;
    filter: blur(2.5px) brightness(60%);
`;

export default Upcoming;