import React from "react";
import Axios from "axios";
import party from "../images/party.jpg";
import styled from "styled-components";
import { Link, } from "react-router-dom";
import { Card, } from "react-bootstrap";
import { Container, Header, Segment, } from "semantic-ui-react";

class Explore extends React.Component {
  state = { events: [], };

  componentDidMount() {
    Axios.get("/api/events")
      .then(res => {
        this.setState({ events: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  }


  render() {
    return (
      <Container>
        <Header as="h1">Find new events!</Header>
        <Segment>Search Bar</Segment>
        <Container>
          {/* <Card.Group> */}
            {this.state.events.map(e => (
              <div key={e.id} style={{ paddingLeft: "248px" }}>
                <Link>
                  <Card style={{ width: "200px", height: "100px" }} className="bg-dark text-white">
                    <MyCardImage src={party} alt="event location" />
                    <Card.ImgOverlay>
                      <Card.Title>{e.name}</Card.Title>
                      <br />
                      <Card.Text>{e.date}</Card.Text>
                    </Card.ImgOverlay>
                  </Card>
                </Link>
              </div>
            ))
            }
          {/* </Card.Group> */}
        </Container>
      </Container>
    );
  };
};

const MyCardImage = styled(Card.Img)`
    width: 200px;
    height: 100px;
    filter: blur(2.5px) brightness(60%);
`;

export default Explore;