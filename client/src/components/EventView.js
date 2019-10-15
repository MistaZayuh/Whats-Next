import React from "react";
import axios from "axios";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import building from "../images/building.jpeg";
import party from "../images/party.jpg";
import styled from "styled-components";
import moment from "moment";
import { Carousel, } from "react-bootstrap";
import { Grid, Segment, Button, Container, Card, Image, Header } from "semantic-ui-react";
import "../styles/EventView.css";
import CommentForm from "./CommentForm";
import GoingList from "./GoingList";



class EventView extends React.Component {
  state = { event: {}, eventUsers: [], comments: [], };

  componentDidMount() {
    const { id } = this.props.match.params
    axios.get(`/api/events/${id}`)
      .then(res => {
        this.setState({ event: res.data })
        var eventInfo = res.data
        axios.get(`/api/specific_event_users?specificeventid=${eventInfo.id}`)
          .then(res => {
            this.setState({ eventUsers: res.data })
          })
          .catch(err => {
            console.log(err)
          })
          axios.get(`/api/specific_event_comments?specificeventid=${eventInfo.id}`)
            .then(res => {
              this.setState({comments: res.data})
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
    const { history, match: { params } } = this.props
    axios.delete(`/api/events/${params.id}`)
      .then(res => {

        history.push("/")
      })
      .catch(err => {

        console.log(err)
      })
  };

  // componentDidUpdate() {

  // }

  listPosts = () => {
    return this.state.comments.map (c => ( 
      <Card fluid>
        <Card.Content>
          <Image
            floated='left'
            circular
            size='mini'            
            src={'https://react.semantic-ui.com/images/avatar/large/steve.jpg'}
            />
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>{moment(c.created_at).format("LLL")}</Card.Meta>
          <Card.Description>
            {c.body}
          </Card.Description>
        </Card.Content>
      </Card>
      
      
    ))
  }

  render() {
    return (
      <>


              <div>
                <div className='opacity-test'>
                <img src={building} className='background-image-events'/>
                </div>
            

        <Container>
        
          <div className="banner-event-name" >
            <h1
            className="event-name"
              >
              {this.state.event.name}
            </h1>
          </div>

          <div className="banner-event-date">
            <p
            className="event-date">
              <Moment format="LLL">{this.state.event.date}</Moment>
            </p>
          </div>
          

          <div>
            <Button
            color="blue" 
            className="join-event-button">
              Join Event
              </Button>
          </div>
        </Container>
          </div>
        <br />

        <br />
      
      <div >
      <Container style={{ padding: '2em 0em', }}>
        <Grid columns={2}>
          
          <Grid.Column width={12}>
            <Header >WHAT'S NEW?</Header>
            <CommentForm event={this.state.event} />         
      
            <br />
            <Segment basic>
              <Card.Group>
                
                {this.listPosts()}
              </Card.Group>
            </Segment>
          </Grid.Column>

          
          <Grid.Column width={3} >
            <Segment  basic>{this.state.event.description}</Segment>

            <GoingList />

            <Segment basic >
              <Button 
                as={Link} 
                to={`/events/${this.state.event.id}/edit`}   
                inverted color="blue" 
                fluid
                >
                Edit Event
              </Button>
              <br />
              <Button  
                onClick={() => this.deleteEvent()} 
                inverted color="red"
                fluid
                >
                Delete Event
              </Button>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
      </div>
      <br />


      </>
    )
  }
};





export default EventView;