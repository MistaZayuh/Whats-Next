import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Header, Image, Button, Container, Grid, Segment, SegmentGroup } from "semantic-ui-react";


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
        
        history.push("/")
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
        
      </Container>  
      <br />
     
        <Container textAlign="right">
        </Container>
     
      <br />
      <br />
      
      <div>
      <Container style={{ padding: '5em 0em' }}>
        <Grid columns={2}>

          <Grid.Column >Create Post</Grid.Column>

          

          <Grid.Column width={4} >
            <Segment  basic>{this.state.event.description}</Segment>
            <Segment.Group >
              <Segment>Going -</Segment>
              <Segment.Group>
                <Segment>Person 1</Segment>
                <Segment>Person 2</Segment>
                <Segment>Person 3</Segment>
              </Segment.Group>
            </Segment.Group>

            <Segment basic >
              <Button  
                onClick={() => this.deleteEvent()} 
                inverted color="red"
                size="small"
                >
                Delete Event
              </Button>
              <Button 
                as={Link} 
                to={`/events/${this.state.event.id}/edit`}   
                inverted color="blue" 
                size="small"
                >
                Edit Event
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
      </div>

      <br />
      <br />
     

        {/* <Container text textAlign="right" >
          <p>Location:</p>
          <p> {this.state.event.location} </p>
          <p>
            Description:
          </p>
          <p>
            {this.state.event.description}
          </p>
        </Container> */}
      {/* <br />
        <Container textAlign="center">
          <Button  onClick={() => this.deleteEvent()} inverted color="red">Delete Event</Button>
          <Button 
            as={Link} 
            to={`/events/${this.state.event.id}/edit`}  
            size="small" 
            >
          Edit Event
          </Button>
          <Button>
            Join Event
          </Button>
        </Container> */}
        <br />
   
     
      </>
    )
  }
};



export default EventView;