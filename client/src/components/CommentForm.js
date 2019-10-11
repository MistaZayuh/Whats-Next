import React from "react"
import {AuthConsumer} from "../providers/AuthProvider";
import {Comment, Form, Button, Image, Segment} from "semantic-ui-react";
import Axios from "axios";





class CommentForm extends React.Component {
  state = { body: "", }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { body} = this.state
    const { event} = this.props;
    Axios.post(`/api/events/${event.id}/comments`, body)
      .then( res => {
        debugger
      })
      .catch( err => {
        debugger
      })
      debugger
  };

  render() {
    
    return(
      <Segment basic >
          {/* <Image src={user.image} /> */}
          <Form onSubmit={this.handleSubmit}>
              <Form.Input 
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
                placeholder="Write your thoughts, feelings or ideas"
                />
              <Form.Button primary floated="right">
                Post
              </Form.Button>
          </Form>      
    </Segment>
    )
  }
}

export class ConnectedCommentForm extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <CommentForm { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}


export default CommentForm;