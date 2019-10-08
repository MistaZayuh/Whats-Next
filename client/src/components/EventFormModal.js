import React from "react";
import axios from "axios";
import { Form, TextArea, Checkbox, } from "semantic-ui-react";
import { Modal, Button, } from "react-bootstrap";

class EventFormModal extends React.Component {
    state = { date: "", name: "", location: "", description: "", open: true };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { router } = this.props
    axios.post("/api/events", this.state )
      .then(res => {
        this.props.history.push("/")
      });
  };

  handleCheckChange = (e, { name, checked }) => {
    this.setState({ [name]: !!checked })
  }

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
              <Form.Input
                label="Date/Time"
                name="date"
                inline
                required
                placeholder="Date"
                type="date"
                value={this.state.date}
                iconPosition="left"
                onChange={this.handleChange}
              />
              <br />
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

export default EventFormModal;