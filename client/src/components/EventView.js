import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Header, Image, Button, Container} from "semantic-ui-react";


class EventView extends React.Component {
  state = { event: {}, }

  componentDidMount() {
    const {id} = this.props.match.params
    axios.get(`/api/events/${id}`)
      .then(res => {
        this.setState({ event: res.data})
      })
  }
  
  deleteEvent = (id) => {
    const {history} = this.props
    axios.delete(`/api/events/${id}`)
      .then( res => {
        debugger
        history.push("/api/events")
      })
      .catch( err => {
        console.log(err)
      })
  };

  render() {
    return(
      <> 
      <br />
      <Container >
        {/* <Image src="/client/src/images/building.jpeg" fluid /> */}
        <Header 
          
          as="h1" 
          size="huge"
          textAlign="left">
          {this.state.event.name}
        </Header>
        <Header
          sub
          size="large"
          textAlign="left">
          {this.state.event.date}
          </Header>
        
      <br />
      <div>
          <Button as={Link} to={`/events/${this.state.event.id}/edit`}  size="small" floated="right">
          Edit Event
          </Button>
      </div> 
      </Container>  
      <br />
      <br />
      <br />
      <Container>
        
          <Header as="h3" floated='right'>
            {this.state.event.location}
          </Header>
        
      </Container>

      <br />
      <br />
     

        <Container text textAlign="right" >
          <p>
            Description:
          </p>
          <p>
            {this.state.event.description}
          </p>
        </Container>
      <br />
        <Container textAlign="center">
          <Button  onClick={this.deleteEvent} inverted color="red">Delete Event</Button>
        </Container>
   
     
      </>
    )
  }
};











export default EventView;