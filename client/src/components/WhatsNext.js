import React from "react";
import { Header, Card, Container } from "react-bootstrap";
import { Link, } from "react-router-dom";
import moment from "moment";
import { AuthConsumer } from "../providers/AuthProvider";
import building from "../images/building.jpeg";
import styled from "styled-components";
import axios from "axios";

class WhatsNext extends React.Component {
	state = { days: null, hours: null, minutes: null, seconds: null, };

	componentDidMount() {
		this.ticker = setInterval(() => this.tick(), 1000)
	};

	tick = () => {
		var now = moment().format("X")
		var eventDate = moment(this.props.nextEvent.date).format("X")
		var timeLeft = eventDate - now
	}

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<Link to={`/events/${this.props.nextEvent.id}`}>
					<Card style={{ width: "700px", height: "200px" }} className="bg-dark text-white">
						<MyCardImage src={this.props.nextEvent.image || building} alt="nextEvent location" />
						<Card.ImgOverlay>
							<Card.Title>{this.props.nextEvent.name}</Card.Title>
							<Card.Text>
								{this.props.nextEvent.description}
							</Card.Text>
							<Card.Text>{moment(this.props.nextEvent.date).format('MMMM Do YYYY, h:mm:ss a')}</Card.Text>
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

const ConnectedWhatsNext = (props) => (
	<AuthConsumer>
		{auth =>
			<WhatsNext {...props} auth={auth} />
		}
	</AuthConsumer>
)

const MyCardImage = styled(Card.Img)`
    width: 650px;
    height: 200px;
    filter: blur(2.5px) brightness(60%);
`;

export default ConnectedWhatsNext;