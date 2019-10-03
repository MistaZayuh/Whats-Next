import React from 'react';
import axios from 'axios';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Grid, Image, Header, Button } from 'semantic-ui-react';

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class User extends React.Component {
  state = { name: "", nickname: "", email: "", image: "", };

  // componentDidMount() {
  //   const { auth: { user, } } = this.props
  //   axios.get(`/api/users/${user.id}`)
  //     .then(res => {
  //       this.setState({ name: res.data.name, nickname: res.data.nickname, image: res.data.image })
  //     })
  //     .catch(err => console.log(err))
  //   // const { auth: { user: {name, nickname, email, image, }, }, } = this.props;
  //   // this.setState({ name: name, nickname: nickname, email: email, image: image, });
  // };

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