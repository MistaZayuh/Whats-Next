import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Header, Image, Button, Container} from "semantic-ui-react";


class EventView extends React.Component {
  state = { event: {} }

  componentDidMount() {
    const {id} = this.props.match.params
    axios.get(`/api/events/${id}`)
      .then(res => {
        this.setState({ event: res.data})
      })
  }

  render() {
    return(
      <> 
      <div >
        {/* <Image src="/client/src/images/building.jpeg" fluid /> */}
        <Header as="h1" textAlign="left">{this.state.event.name}</Header>
        <Header sub textAlign="left">{this.state.event.date}</Header>
        
      </div>  
      <br />
      <div>
          <Button as={Link} to={`/events/${this.state.event.id}/edit`}  >
          Edit Event
          </Button>
      </div> 
      <br />
      <div>

        <Container text >
          <p>
            {this.state.event.description}
          </p>
        </Container>
      </div>
     
      </>
    )
  }
};











export default EventView;