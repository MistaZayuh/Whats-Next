import React from "react";
import { Header, Card, Container } from "react-bootstrap";
import { Link, } from "react-router-dom";
import moment from "moment";
import { AuthConsumer } from "../providers/AuthProvider";
import building from "../images/building.jpeg";
import styled from "styled-components";
import axios from "axios";

class WhatsNext extends React.Component {
	state = { event: null, };

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.nextEvent !== this.props.nextEvent) {
			this.setState({ event: this.props.nextEvent })
		}
		if (prevState.event !== this.state.event) {
		}
	};

	renderCountdown = () => {
		const { nextEvent: { date }, auth: { user } } = this.props
		axios.get(`/api/accepted_user_events?specificuserid=${user.id}`)
			.then(res => {
				if (res.data.length !== 0) {
					this.setState({ event: res.data[0] })
				}
			})
			.catch(err => {
				console.log(err)
			})
			var eventDate = new Date(date)
			var now = new Date()
			let secondsLeft = moment(eventDate).diff(now, "seconds")
			let subtracted = moment(eventDate).subtract(now)
			let minutesLeft = moment.duration(moment(eventDate).diff(now))
			let hoursLeft = eventDate.toDateString()
			let daysLeft = Math.floor(secondsLeft / 86400) 
			let weeksLeft = Math.floor(secondsLeft / 604800)
			let monthsLeft = Math.floor(secondsLeft / 2628288)
			let yearsLeft = Math.floor(secondsLeft / 31536000)
		return (
			<Container>

				{yearsLeft == 0 ?
					null
					:
					<div>
						Years: {Math.floor(yearsLeft)}
					</div>
				}
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
				}
				

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