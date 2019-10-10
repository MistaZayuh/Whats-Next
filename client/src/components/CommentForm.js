import React from "react"
import {AuthConsumer} from "../providers/AuthProvider";
import {Comment, Form, Button, Image, Segment} from "semantic-ui-react";





class CommentForm extends React.Component {




  render() {
    
    return(
      <Segment basic >
          {/* <Image src={user.image} /> */}
          <Form>
              <Form.Input 
                name="comment"
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