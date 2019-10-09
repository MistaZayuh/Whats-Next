import React from "react";
import moment from "moment";
import { Header, Card, } from "react-bootstrap";
import { Link, } from "react-router-dom";
import building from "../images/building.jpeg";
import party from "../images/party.jpg";
import styled from "styled-components";

const Upcoming = ({event}) => (
	<div style={{ paddingLeft: "248px" }}>
		<Link>
			<Card style={{ width: "200px", height: "100px" }} className="bg-dark text-white">
				<MyCardImage src={event.image || party} alt="event location" />
				<Card.ImgOverlay>
					<Card.Title>{event.name}</Card.Title>
					<br />
					<Card.Text>{moment(event.date).format("LLLL")}</Card.Text>
				</Card.ImgOverlay>

			</Card>
		</Link>
	</div>
)

const MyCardImage = styled(Card.Img)`
    width: 200px;
    height: 100px;
    filter: blur(2.5px) brightness(60%);
`;

export default Upcoming;