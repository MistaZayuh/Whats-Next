import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header, Image, Button, Container } from "semantic-ui-react";


class EventView extends React.Component {
  state = { event: {}, eventUsers: [] };

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/events/${id}`)
      .then(res => {
        this.setState({ event: res.data })
        var eventInfo = res.data
        axios.get(`/api/specific_event_users?specificeventid=${eventInfo.id}`)
          .then(res => {
            this.setState({ eventUsers: res.data})
          })
          .catch(err => {
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  deleteEvent = () => {
    const {history, match: {params}} = this.props
    axios.delete(`/api/events/${params.id}`)
      .then( res => {
        debugger
        history.push("/")
      })
      .catch( err => {
       debugger
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
        
          </Container>  
      <br />
     
        <Container textAlign="right">
          <Button 
            as={Link} 
            to={`/events/${this.state.event.id}/edit`}  
            size="small" 
            >
          Edit Event
          </Button>
        </Container>
     
      <br />
      <br />
      {/* <br />
      <Container textAlign="right">
        
          <Header as="h3" >
            {this.state.event.location}
          </Header>
        
      </Container> */}

      <br />
      <br />
     

        <Container text textAlign="right" >
          <p>Location:</p>
          <p> {this.state.event.location} </p>
          <p>
            Description:
          </p>
          <p>
            {this.state.event.description}
          </p>
        </Container>
      <br />
        <Container textAlign="center">
          <Button  onClick={() => this.deleteEvent()} inverted color="red">Delete Event</Button>
        </Container>
   
     
      </>
    )
  }
};



export default EventView;