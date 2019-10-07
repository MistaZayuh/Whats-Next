import React from "react";
import { Header, Card,  } from "react-bootstrap";
import { Link, } from "react-router-dom";
import moment from "moment"
import building from "../images/building.jpeg"
import styled from "styled-components";
import axios from "axios";

class WhatsNext extends React.Component {
	state = { events: [], timeLeft: null, };

	componentDidMount() {
		axios.get("/api/events_index")
		    .then( res => {
					this.setState({events: [res.data]})
					this.calculateTime();
		    })
		    .catch( err => {
		        console.log(err)
		    })
	};

	calculateTime = () => {
		// debugger
		// var ddmmyyy = nextnext.date.toLocaleDate();
		// var time = next.date.toLocaleTime();
		// this.setState({timeLeft: ddmmyyy + " " + time})
		// debugger
	}

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