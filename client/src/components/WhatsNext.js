import React from "react";
import { Header, Card,  } from "react-bootstrap";
import { Link, } from "react-router-dom";
import building from "../images/building.jpeg"
import styled from "styled-components";
import Axios from "axios";

class WhatsNext extends React.Component {
	state = { event: [], timeLeft: null, };

	componentDidMount() {
		Axios.get(`/api/user/events`)
		    .then( res => {
		        debugger
		        this.setState({ event: res.data})
		    })
		    .catch( err => {
		        debugger
		        console.log(err)
		    })
	};

	render() {
			return (
					<div style={{display: "flex", justifyContent: "space-around"}}>
							<Link>
							<Card style={{ width: "600px", height: "250px" }} className="bg-dark text-white">
									<MyCardImage  src={building} alt="event location" />
									<Card.ImgOverlay>
											<Card.Title>THIS AWESOME EVENT</Card.Title>
											<Card.Text>
													#this section will be the description of the event.
												</Card.Text>
											<Card.Text>#eventDate</Card.Text>
											<Card.Text></Card.Text>
									</Card.ImgOverlay>

							</Card>
							</Link>
					</div>
			);
	};
};

const MyCardImage = styled(Card.Img)`
    width: 650px;
    height: 250px;
    filter: blur(2.5px) brightness(60%);
`;

export default WhatsNext;