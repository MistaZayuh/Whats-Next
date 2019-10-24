import React from "react";
import moment from "moment";
import { Card } from "react-bootstrap";
import { Link, } from "react-router-dom";
import party from "../images/party.jpg";
import styled from "styled-components";


const Upcoming = ({ event }) => (
	<Link to={`/events/${event.id}`}>
		<Card style={{ width: "213px", height: "120px" }} className="bg-dark text-white">
			<MyCardImage src={event.image || party} alt="event location" />
			<Card.ImgOverlay>
				<Card.Title>{event.name || event.event_name}</Card.Title>
				<br />
				<Card.Text>{moment(event.date).format("ll, h:mm a")}</Card.Text>
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