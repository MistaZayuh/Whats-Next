import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Grid, Image, Header, Button, Segment, Container } from 'semantic-ui-react';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class User extends React.Component {
  state = { invitedEvents: [], };

  componentDidMount() {
    axios.get(`/api/specific_user_events?specificuserid=${this.props.match.params.id}`)
      .then(res => {
        this.setState({ invitedEvents: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  };

  render() {
    const { auth: { user }, } = this.props;
    return (
      <Container>
      <br /> 
      <Grid>
        <Grid.Row >
          <Grid.Column width={7}>
           
              <Image src={user.image || defaultImage} />
           
          </Grid.Column>
          <Grid.Column width={9}>
            <br />
            <br />
            <br />
            <Header size="huge">{user.name} {user.nickname}</Header>
            <Header size="medium" >{user.email}</Header>
            <br />
            <Button as={Link} to='/users/:id/edit' >Edit Profile</Button>
            <br />
            <br />
            <br />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Container>
    )
  }
}



const ConnectedUser = (props) => (
  <AuthConsumer>
    { auth =>
      <User { ...props } auth={auth} />
    }
  </AuthConsumer>
)

export default ConnectedUser;