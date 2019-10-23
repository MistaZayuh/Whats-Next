import React from "react";
import { Header, Card, Container } from "react-bootstrap";
import { Link, } from "react-router-dom";
import moment from "moment";
import { AuthConsumer } from "../providers/AuthProvider";
import building from "../images/building.jpeg";
import styled from "styled-components";
import axios from "axios";
import ClockHome from "./ClockHome";
import "moment-timezone";
import "../styles/WhatsNext.css";

class WhatsNext extends React.Component {
  state = { days: null, hours: null, minutes: null, seconds: null, event: {} };



  render() {
    // var eventDate = moment.tz(this.props.nextEvent.date, "America/Denver").format("X")
    return (
      // <div className="wn-overall" >
        <Link to={`/events/${this.props.nextEvent.id}`}>
          <Card className="wn-card"  >
            <MyCardImage className="wn-image" src={this.props.nextEvent.image || building} alt="nextEvent location" />
            <Card.ImgOverlay>
              <MyCardTitle style={{width: "100%"}}>{this.props.nextEvent.name}</MyCardTitle>
              {/* <Moment format="LLL">{this.props.nextEvent.date}</Moment> */}
              {/* <div style={{color: "white"}}>{moment.tz(this.props.nextEvent.date, "America/Denver").format("LLL")}</div> */}
              {/* <div style={{}}> */}
                <ClockHome
                  deadline={this.props.nextEvent.date}
                />
              {/* </div> */}
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
      // </div>
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

const MyCardTitle = styled(Card.Title)`
    color: white;
    font-family: 'Barlow', sans-serif;
    font-size: 3em !important;
`;

export default ConnectedWhatsNext;
