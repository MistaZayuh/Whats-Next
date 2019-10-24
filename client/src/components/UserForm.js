import React from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import styles from "styled-components";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, Container } from "semantic-ui-react";
import { Image, } from "react-bootstrap";

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class UserForm extends React.Component {
  state = { name: "", nickname: "", file: null, };

  componentDidMount() {
    const { auth: { user, }, match: { params,}, history } = this.props
    if (user.id !== params.id) {
      history.push(`/users/${user.id}/edit`)
    };
    axios.get(`/api/users/${user.id}`)
      .then(res => {
        this.setState({ name: res.data.name, nickname: res.data.nickname, image: res.data.image })
      })
      .catch(err => console.log(err))
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // let data = new FormData();
    // data.append("name", this.state.name)
    // data.append("nickname", this.state.nickname)
    // data.append("file", this.state.file)

    // const { formValues: { firstName, lastName, email, file, }, } = this.state;
    
    // const { auth: { user: { id, } }, history, } = this.props;
    // // updateUser(user.id, { firstName, lastName, email, file, });
    // axios.put(`/api/users/${id}`, data )
    //   .then(res => {
    //     history.push(`/users/${id}`)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    const{name, nickname, file} = this.state
    const{auth: { user, updateUser,} } = this.props;
    updateUser(user.id, {name, nickname, file})
    // this.setState({ 
      
    // })
  };

  onDrop = (files, rejectFiles) => { 
    console.log(files)
    console.log("Rejected Image=>",rejectFiles)
    debugger
    this.setState({file: files[0]})
  }

  render() {
    const { auth: { user, } } = this.props;
    return (
      <div>
        <br/>
        <Container>
            <Header as="h1" >{ this.props.auth.user.name } { this.props.auth.user.nickname }</Header>
              <Image style={{width: "15%", height: "15%", border: "solid, black, 1px,"}} roundedCircle src={user.image || defaultImage } />
            <Form onSubmit={this.handleSubmit}>
              <Form.Input
                label="First Name"
                name="name"
                placeholder="First Name"
                required
                onChange={this.handleChange}
                value={this.state.name}
                />
              <Form.Input
                label="Last Name"
                name="nickname"
                placeholder="Last Name"
                required
                onChange={this.handleChange}
                value={this.state.nickname}
                />
              {/* <Form.Input
                label="Your Profile Image URL"
                name="image"
                placeholder="Upload an image"
                required
                onChange={this.handleChange}
                value={this.state.image}
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
              <br/>
            <Form.Button color="blue">Submit</Form.Button>
            </Form>
        </Container>
        <br/>
      </div>
    );
  };
};



const ConnectedUserForm = (props) => (
  <AuthConsumer>
    {auth =>
      <UserForm {...props} auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedUserForm;




