import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { withRouter, } from "react-router-dom";
import { TextArea, Checkbox, Form, } from "semantic-ui-react";
import { Modal, Button, } from "react-bootstrap";
import { AuthConsumer } from "../providers/AuthProvider";
import { DateTimeInput } from "semantic-ui-calendar-react";


class EventFormModal extends React.Component {
    state = { date: "", name: "", location: "", description: "", file: "", open: true };
    
    handleChange = (e, { name, value }) => {
      this.setState({ [name]: value });
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      const { date, name, location, description, file, } = this.state;
      const { history, auth: {user} } = this.props;
      let data = new FormData();
      // data.set("date", date)
      // data.append("name", name)
      // data.append("location", location)
      // data.append("description", description)
      data.append('file', file)
      axios.post(`/api/events?date=${date}&name=${name}&location=${location}&description=${description}`, data)
        .then(res => {
          axios.post(`/api/users/${user.id}/invitations`, {accepted: true, organizer: true, event_id: res.data.id})
          history.push(`/events/${res.data.id}`)
          history.push(`/refresh`)
        })
    };
  
    handleCheckChange = (e, { name, checked }) => {
      this.setState({ [name]: !!checked })
    };

    onChange = date => this.setState({ date });

    onDrop = (files, rejectFiles) => { 
      console.log(files)
      debugger
      console.log("Rejected Image=>",rejectFiles)
      // let data = new FormData();
      // data.append('file', files)
      this.setState({file: files[0]})
    };

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
              {/* <Form.Field
                name="open"
                control={Checkbox}
                label='Open Event'
                // value={!this.state.open}
                checked={this.state.open}
                onChange={this.handleCheckChange}
              /> */}
              <Dropzone
                onDrop={this.onDrop}
                multiple={false}
              >
                {({ getRootProps, getInputProps, isDragActive }) => {
                  return (
                    <div
                      {...getRootProps()}
                      style={styles.dropzone}
                    >
                      <input {...getInputProps()} />
                      {
                        isDragActive ?
                          <p>Drop files here...</p> :
                          <p>Drop/Click to select files to upload.</p>
                      }
                    </div>
                  )
                }}
              </Dropzone>
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

const styles = {
  dropzone: {
    height: "150px",
    width: "150px",
    border: "1px dashed black",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
  },
}

export default withRouter(ConnectedEventFormModal);