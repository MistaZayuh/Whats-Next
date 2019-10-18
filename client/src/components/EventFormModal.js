import React from "react";
import axios from "axios";
import { withRouter, } from "react-router-dom";
import { TextArea, Checkbox, Form, } from "semantic-ui-react";
import { Modal, Button, } from "react-bootstrap";
import { AuthConsumer } from "../providers/AuthProvider";
import { DateTimeInput } from "semantic-ui-calendar-react";


class EventFormModal extends React.Component {
    state = { date: "", name: "", location: "", description: "", open: true };
    
    handleChange = (e, { name, value }) => {
      this.setState({ [name]: value });
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      const { location, history, auth: {user} } = this.props
        axios.post("/api/events", this.state )
        .then(res => {
          axios.post(`/api/users/${user.id}/invitations`, {accepted: true, organizer: true, event_id: res.data.id})
          history.push(`/events/${res.data.id}`)
          history.push(`/refresh`)
        })
    };
  
    handleCheckChange = (e, { name, checked }) => {
      this.setState({ [name]: !!checked })
    };

    onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        <Modal {...this.props}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Event!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>

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

              <p><strong>Date/Time</strong></p>
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
              <Form.Button inverted onClick={this.props.onHide} primary>Submit</Form.Button>

            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onHide}>
              Close
                        </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
};

const ConnectedEventFormModal = (props) => (
  <AuthConsumer>
    {auth =>
      <EventFormModal {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default withRouter(ConnectedEventFormModal);