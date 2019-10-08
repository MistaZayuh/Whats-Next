import React from 'react';
import axios from 'axios';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Grid, Image, Header, Button } from 'semantic-ui-react';

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
      <>
        <Grid.Column>
          <Image src={user.image || defaultImage} />
        </Grid.Column>
        <Grid.Column>
          <Header as ="h1">{user.name}</Header>
          <Header as ="h1">{user.nickname}</Header>
          <Header as ="h2">{user.email}</Header>
        </Grid.Column>
        <Button href='/users/:id/edit' color='yellow'>Edit</Button>
      </>
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