import React from "react";
import { Header, Card,  } from "react-bootstrap";
import { Link, } from "react-router-dom";
import building from "../images/building.jpeg"
import party from "../images/party.jpg";
import styled from "styled-components";

class Upcoming extends React.Component {

    render() {
        return (
            <div style={{paddingLeft: "248px"}}>
                <Link>
                <Card style={{ width: "200px", height: "100px" }} className="bg-dark text-white">
                    <MyCardImage  src={party} alt="event location" />
                    <Card.ImgOverlay>
                        <Card.Title>#eventName</Card.Title>
                        <br/>
                        <Card.Text>#eventDate</Card.Text>
                    </Card.ImgOverlay>

                </Card>
                </Link>
            </div>
        );
    };
};

const MyCardImage = styled(Card.Img)`
    width: 200px;
    height: 100px;
    filter: blur(2.5px) brightness(60%);
`;

export default Upcoming;