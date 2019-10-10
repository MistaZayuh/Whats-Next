import React from "react";
import { Header, Card, Container  } from "react-bootstrap";
import { Link, } from "react-router-dom";
import moment from "moment";
import building from "../images/building.jpeg";
import styled from "styled-components";

class WhatsNext extends React.Component {
	state = { event: null, years: "", months: "", weeks: "", days: "", hours: "", minutes: "", seconds: "", };

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.nextEvent !== this.props.nextEvent ) {
			this.setState({ event: this.props.nextEvent })
		} 
		if (prevState.event !== this.state.event) {
		}
	};


	render() {
			return (
					<div style={{display: "flex", justifyContent: "space-around"}}>
							<Link to={`/events/${this.props.nextEvent.id}`}>
							<Card style={{ width: "700px", height: "200px" }} className="bg-dark text-white">
									<MyCardImage  src={this.props.nextEvent.image || building} alt="nextEvent location" />
									<Card.ImgOverlay>
											<Card.Title>{this.props.nextEvent.name}</Card.Title>
											<Card.Text>
													{this.props.nextEvent.description}
												</Card.Text>
											<Card.Text>{moment(this.props.nextEvent.date).format('MMMM Do YYYY, h:mm:ss a') }</Card.Text>
											<Container>
												<div>
													{/* { this.state.days } days */}
												</div>
												<div>
													{/* { this.state.hours } Hours */}
												</div>
											</Container>
									</Card.ImgOverlay>

							</Card>
							</Link>
					</div>
			);
	};
};

const MyCardImage = styled(Card.Img)`
    width: 650px;
    height: 200px;
    filter: blur(2.5px) brightness(60%);
`;

export default WhatsNext;