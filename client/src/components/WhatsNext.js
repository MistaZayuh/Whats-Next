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


		// this.setState({ years, months, weeks, days, hours, minutes, seconds})
	};

	renderCountdown = () => {
		var now = moment().format("LLL")
		var eventDate = moment(this.props.nextEvent.date).format("LLL")
		var d = moment(eventDate).format("DDD") - moment(now).format("DDD")
		var h = moment(eventDate).fromNow()
		var m = moment(eventDate).format("m") - moment(now).format("m")
		var s = moment(eventDate).format("s") - moment(now).format("s")
		return (
			<Container>

				{now == 0 ?
					null
					:
					<div>
						Days: {d}
						Hours: {h}
						Minutes: {m}
						Seconds: {s}
					</div>
				}
				{/* 
				{monthsLeft == 0 ?
					null
					:
					<div>
						Months: {Math.floor(monthsLeft)}
					</div>
				}
				{weeksLeft == 0 ?
					null
					:
					<div>
						Weeks: {Math.floor(weeksLeft)}
					</div>
				}
				{daysLeft == 0 ?
					null
					:
					<div>
						Days: {daysLeft}
					</div>
				}
				{hoursLeft == 0 ?
					null
					:
					<div>
						Hours: {Math.floor(hoursLeft)}
					</div>
				}
				{minutesLeft == 0 ?
					null
					:
					<div>
						Minutes: {Math.floor(minutesLeft)}
					</div>
				}
				{secondsLeft == 0 ?
					null
					:
					<div>
						Seconds: {Math.floor(secondsLeft)}
					</div>
				} */}
				

			</Container>
		)
	}

	render() {
		return (
			<div style={{ display: "flex", justifyContent: "space-around" }}>
				<Link to={`/events/${this.props.nextEvent.id}`}>
					<Card style={{ width: "600px", height: "250px" }} className="bg-dark text-white">
						<MyCardImage src={this.props.nextEvent.image || building} alt="nextEvent location" />
						<Card.ImgOverlay>
							<Card.Title>{this.props.nextEvent.name}</Card.Title>
							<Card.Text>
								{this.props.nextEvent.description}
							</Card.Text>
							<Card.Text>{moment(this.props.nextEvent.date).format('MMMM Do YYYY, h:mm:ss a')}</Card.Text>
							<Container>
								<div>
									{this.renderCountdown()}
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
    height: 250px;
    filter: blur(2.5px) brightness(60%);
`;

export default ConnectedWhatsNext;