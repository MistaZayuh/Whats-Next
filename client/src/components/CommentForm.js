import React from "react"
import {AuthConsumer} from "../providers/AuthProvider";
import {Comment, Form, Button, Image, Segment} from "semantic-ui-react";
import Axios from "axios";
import styled from "styled-components";





class CommentForm extends React.Component {
  state = { comment: "", }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    debugger
    const { event} = this.props;
    Axios.post(`/api/events/${event.id}/comments`, this.state)
      .then( res => {
        debugger
      })
      .catch( err => {
        debugger
      })
      debugger
  }

  render() {
    
    return(
      <Segment basic >

          <Form onSubmit={this.handleSubmit}>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
          <Image 
            src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' 
            size="mini" 
            circular 
            
            />
              <MyFormInput 
                
                name="comment"
                value={this.state.comment}
                onChange={this.handleChange}
                placeholder="Write your thoughts, feelings or ideas"
              />
                </div>
              
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

const MyFormInput = styled(Form.Input)`
    width: 92% !important;
`;

export default CommentForm;