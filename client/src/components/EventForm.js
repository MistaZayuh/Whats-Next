import React from "react";
import axios from "axios";
import { Form, TextArea, Checkbox } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";



class EventForm extends React.Component {
  state = { date: "", name: "", location: "", description: "", open: true };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { router } = this.props
    axios.post("/api/events", { ...this.state })
      .then(res => {
        this.props.add(res.data);
        this.setState({ date: "", name: "", location: "", description: "", open: true })
      });
      .then(
        
      )
  };

  handleCheckChange = (e, { name, checked }) => {
    this.setState({ [name]: !!checked })
  }

  render() {
    return (

      <>
        <br />
        {/* <Header as="h1" textAlign="center">New Event</Header> */}
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
      </>
    )
  }
}


export default EventForm;