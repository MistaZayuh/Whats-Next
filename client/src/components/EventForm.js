import React from "react";
import axios from "axios";
import { Form, TextArea, Checkbox, Header } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import { AuthConsumer } from "../providers/AuthProvider";



class EventForm extends React.Component {
  state = { date: "", name: "", location: "", description: "", open: true };

  componentDidMount() {
    
    if (this.props.location.pathname !== "/events/new") {
      axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => {             
          this.setState({ 
            name: res.data.name,
            location: res.data.location,
            date: res.data.date,
            description: res.data.description,
            open: res.data.open,
           })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
  

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { location, match, history } = this.props
     if (location.pathname === "/events/new") {
      axios.post("/api/events", this.state )
      .then(res => {
        history.push(`/events/${res.data.id}`)
      })
    } else {
      axios.put(`/api/events/${match.params.id}`, this.state)
      .then(res => {
        
        history.push(`/events/${match.params.id}`)
      })
    }
      
  };

  handleCheckChange = (e, { name, checked }) => {
    this.setState({ [name]: !!checked })
  };

  render() {
    return (

      <>
      {this.props.location.pathname === "/events/new" ?
        <Header as="h1" textAlign="center">New Event</Header> 
          :
        <Header as="h1" textAlign="center">Edit Event</Header>} 
        <br />
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              label="Event Name"
              placeholder="Event Name"
              name="name"
              required
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Form.Input
              label="Location"
              placeholder="Location"
              name="location"
              required
              value={this.state.location}
              onChange={this.handleChange}
            />
          </Form.Group>
          <DateTimeInput
            label="Date/Time"
            name="date"
            inline
            required
            placeholder="Date"
            value={this.state.date}
            iconPosition="left"
            onChange={this.handleChange}
          />
          <Form.Field
            label="Description"
            placeholder="Description"
            name="description"
            control={TextArea}
            required
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Form.Field
            name="open"
            control={Checkbox}
            label='Open Event'
            // value={!this.state.open}
            checked={this.state.open}
            onChange={this.handleCheckChange}
          />
          <Form.Button primary>Submit</Form.Button>
        </Form>
        <br />
      </>
    )
  };
};

const ConnectedEventForm = (props) => (
  <AuthConsumer>
    {auth =>
    <EventForm {...props} auth={auth} /> 
    }
  </AuthConsumer>
)

export default ConnectedEventForm;