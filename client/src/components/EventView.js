import React from "react";
import axios from "axios";
import Moment from "react-moment";
import moment from "moment";
import { Link } from "react-router-dom";
import building from "../images/building.jpeg";
import { AuthConsumer, } from "../providers/AuthProvider";
import styled from "styled-components";
import { Grid, Segment, Button, Container, Card, Image, Header } from "semantic-ui-react";
import "../styles/EventView.css";
import CommentForm from "./CommentForm";
import Clock from "./Clock";
import GoingList from "./GoingList";
import "moment-timezone";


const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class EventView extends React.Component {
  state = { events: {}, event: {}, eventUsers: [], comments: [], joined: false, nextEvent: {} };
  // BE AWARE if you want the user id from eventUsers, you have to call eventUsers.userid, with no underscore
  // If you only call eventUsers.id, you will get the id of the event -Isaiah

  componentDidMount() {
    const { match: { params: { id } }, auth: { user } } = this.props
    axios.get(`/api/specific_event?specificeventid=${id}`)
    .then(res => {
        this.setState({ event: res.data[0] })
        var eventInfo = res.data
        debugger
        axios.get(`/api/specific_event_users?specificeventid=${res.data[0].id}`)
        .then(res => {
            this.setState({ eventUsers: res.data })
            res.data.filter(u => {
              if (u.user_id == user.id) {
                this.setState({ joined: true })
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
          debugger
        axios.get(`/api/specific_event_comments?specificeventid=${res.data[0].id}`)
          .then(res => {
            debugger
            this.setState({ comments: res.data })
          })
          .catch(err => {
            debugger
            console.log(err)
          })
      })
      .catch(err => {
        console.log(err)
      })
  };


  

  joinEvent = () => {
    const { auth: { user } } = this.props
    const { event, joined, eventUsers } = this.state;
    axios.post(`/api/events/${event.id}/invitations`, { user_id: user.id, event_id: event.id, accepted: true })
      .then(res => {
        this.setState({ joined: true, eventUsers: [{ ...res.data, image: user.image, name: user.name }, ...eventUsers] })
      })
      .catch(err => {
        console.log(err)
      })
  };

  leaveEvent = () => {
    const { event, joined, eventUsers } = this.state;
    var invite = eventUsers.filter(u => {
      if (u.user_id === this.props.auth.user.id) {
        return { ...u }
      }
    });
    axios.delete(`/api/events/${event.id}/invitations/${invite[0].id}`)
      .then(res => {
        var newEventUsers = this.state.eventUsers.filter(u => {
          if (u.user_id !== this.props.auth.user.id) {
            return u
          }
        })
        this.setState({ joined: false, eventUsers: [...newEventUsers] })
      })
      .catch(err => {
        console.log(err)
      })
  };

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

  addComment = (comment) => {
    const {comments} = this.state;
    // const comment = {body,}
    this.setState({comments: [{...comment, name: this.props.auth.user.name}, ...this.state.comments]})
  }

  
  listPosts = () => {
    if (this.state.comments.length <= 0)
      return <Header as="h2" >No Comments</Header>
    
    return ( 
      this.state.comments.map(c => (

      <Card fluid>
        <Card.Content>
          <Image
            floated='left'
            circular
            size='mini'
            src={c.image || defaultImage }
          />
          <Card.Header>{c.name}</Card.Header>
          <Card.Meta>{moment(c.created_at).format("LLL")}</Card.Meta>
          <Card.Description>
            {c.body}
          </Card.Description>
        </Card.Content>
      </Card>

      ))
    )
  };

  render() {
    return (
      <>
        <div>
          <div className='opacity-test'>
            <img src={building} className='background-image-events' />
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
					  <div>{moment.tz(this.state.event.date, "America/Denver").format("LLL")}</div>
              </p>
            </div>
            <Clock
              deadline={this.state.event.date}
            />
            <div>
              {this.state.joined ?
                <Button
                  color="red"
                  onClick={this.leaveEvent}
                >
                  Leave Event
              </Button>
                :
                <Button
                  color="blue"
                  className="join-event-button"
                  onClick={this.joinEvent}
                >
                  Join Event
              </Button>
              }
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
                <CommentForm event={this.state.event} addComment={this.addComment}/>
                <br />
                <Segment basic>
                  <Card.Group>
                    {this.listPosts()}
                  </Card.Group>
                </Segment>
              </Grid.Column>
              <Grid.Column width={3} >
                <Segment basic>{this.state.event.description}</Segment>
                <GoingList users={this.state.eventUsers} />
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
const ConnectedEventView = (props) => (
  <AuthConsumer>
    {auth =>
      <EventView {...props} auth={auth} />
    }
  </AuthConsumer>
)
export default ConnectedEventView;