import React from "react";
import moment from "moment";
import {AuthConsumer} from "../providers/AuthProvider";
import {Comment, Form, Button, Image, Segment} from "semantic-ui-react";
import Axios from "axios";
import styled from "styled-components";
import UserDefault from "../images/UserDefault.png";






class CommentForm extends React.Component {
  state = { body: "", }

  handleChange = (e, {name, value}) => {
    this.setState({ [name]: value})
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { body } = this.state
    const { event, } = this.props;
    Axios.post(`/api/events/${event.id}/comments`, {body})
    .then( res => {
      this.setState({body: ""})
      this.props.addComment(res.data);
      })
      .catch( err => {
        console.log(err)
      })
  };

  render() {
    
    return(
      <Segment basic >

          <Form onSubmit={this.handleSubmit}>
        <div style={{display: "flex", justifyContent: "space-between", marginBottom: "5px"}}>
          <Image 
            src={UserDefault || this.props.auth.user.image} 
            size="mini" 
            circular 
            style={{width: "38px"}}
            />
              <MyFormInput                
                name="body"
                required
                value={this.state.body}
                onSubmit={this.handleSubmit}
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

export default ConnectedCommentForm;