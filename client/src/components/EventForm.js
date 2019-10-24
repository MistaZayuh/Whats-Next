import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Form, TextArea, Header, Container, Image } from "semantic-ui-react";
import { DateTimeInput } from "semantic-ui-calendar-react";
import { AuthConsumer } from "../providers/AuthProvider";
import building from "../images/building.jpeg";



class EventForm extends React.Component {
  state = { date: "", name: "", location: "", description: "", image: "", file: ""};

  componentDidMount() {
    const { match: {params} } = this.props;         
    if (this.props.location.pathname !== "/events/new") {
      axios.get(`/api/events/${params.id}`)
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
      let data = new FormData();
      data.append('file', this.state.file)
      data.append("name", this.state.name)
      data.append("date", this.state.date)
      data.append("location", this.state.location)
      data.append("description", this.state.description)

      
      const { location, match, history, auth: {user} } = this.props
      if (location.pathname === "/events/new") {
        axios.post("/api/events", this.state )
        .then(res => {
          axios.post(`/api/users/${user.id}/invitations`, {accepted: true, organizer: true, event_id: res.data.id})
          
          history.push(`/events/${res.data.id}`)
      })
    } else {
      axios.put(`/api/events/${match.params.id}`, data)
      .then(res => {
        history.push(`/events/${match.params.id}`)
      })
    }
      
  };

  handleCheckChange = (e, { name, checked }) => {
    this.setState({ [name]: !!checked })
  };

  onDrop = (files, rejectFiles) => { 
    console.log(files)
    console.log("Rejected Image=>",rejectFiles)
    // let data = new FormData();
    // data.append('file', files)
    this.setState({file: files[0]})
  }

  render() {
    return (

      <Container>
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
          
          <Image  src={this.state.file || building}
          
          />
          

          {/* <Form.Field
            name="open"
            control={Checkbox}
            label='Open Event'
            // value={!this.state.open}
            checked={this.state.open}
            onChange={this.handleCheckChange}
          /> */}
          <Form.Button primary >Submit</Form.Button>
        </Form>
        <br />
      </Container>
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

export default ConnectedEventForm;