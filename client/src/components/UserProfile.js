import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import { AuthConsumer, } from "../providers/AuthProvider";
import { Grid, Image, Header, Button, Segment } from 'semantic-ui-react';

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
            <br />
            <br />
            <br />
          </Grid.Column>
        </Grid.Row>
      </Grid>
            <Button as={Link} to='/users/:id/edit' floated="right">Edit Profile</Button>
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