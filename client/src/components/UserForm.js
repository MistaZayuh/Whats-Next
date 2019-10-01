import React from "react";
import axios from "axios";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Form, Header, Button, } from "semantic-ui-react";
import { Image, } from "react-bootstrap";

class UserForm extends React.Component {
  state = { name: "", nickname: "", image: "", };

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
    const { auth: { user: { id, } }, history, } = this.props;
    axios.put(`/api/users/${id}`, this.state)
      .then(res => {
        history.push(`/users/${id}`)
      })
      .catch(err => {
        console.log(err)
      })
  };

  render() {
    return (
      <div>
        <br/>

        <Header as="h1" >{ this.props.auth.user.name } { this.props.auth.user.nickname }</Header>
          <Image style={{width: "15%", height: "15%", border: "solid, black, 1px,"}} roundedCircle src={this.state.image} />
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label="Name"
            name="name"
            placeholder="Name"
            required
            onChange={this.handleChange}
            value={this.state.name}
          />
          <Form.Input
            label="Nickname"
            name="nickname"
            placeholder="Nickname"
            required
            onChange={this.handleChange}
            value={this.state.nickname}
          />
           <Form.Input
            label="Your Profile Image"
            name="image"
            placeholder="Upload an image"
            required
            onChange={this.handleChange}
            value={this.state.image}
          />
          <br/>
          {/* <Form.Group>
            <Image src="https://image.flaticon.com/icons/svg/145/145867.svg" /> */}
            {/* <Form.Radio
              name="image"
              value='https://image.flaticon.com/icons/svg/145/145867.svg'
              onChange={this.handleChange}
            />
            <Image src="https://image.flaticon.com/icons/svg/145/145852.svg" />
            <Form.Radio
              name="image"
              value='https://image.flaticon.com/icons/svg/145/145852.svg'
              onChange={this.handleChange}
            />
            <Image src="https://image.flaticon.com/icons/svg/145/145859.svg" />
            <Form.Radio
              name="image"
              value='https://image.flaticon.com/icons/svg/145/145859.svg'
              onChange={this.handleChange}
            />
            <Image src="https://image.flaticon.com/icons/svg/145/145862.svg" />
            <Form.Radio
              name="image"
              value='https://image.flaticon.com/icons/svg/145/145862.svg'
              onChange={this.handleChange}
            />
            <Image src="https://image.flaticon.com/icons/svg/145/145866.svg" />
            <Form.Radio
              name="image"
              value='https://image.flaticon.com/icons/svg/145/145866.svg'
              onChange={this.handleChange}
            />
            <Image src="https://image.flaticon.com/icons/svg/145/145864.svg" />
            <Form.Radio
              name="image"
              value='https://image.flaticon.com/icons/svg/145/145864.svg'
              onChange={this.handleChange}
            />
          </Form.Group> */}
        <Form.Button color="blue">Submit</Form.Button>
        </Form>
        <br/>
        {/* <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <Button inverted color="blue">Upload Image</Button>
              </div>
            </section>
          )}
        </Dropzone>
        <br/>*/}
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




