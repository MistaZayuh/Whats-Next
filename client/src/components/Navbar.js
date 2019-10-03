import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Icon, Dropdown, Header, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import logo from "../images/logo.png"
import { Nav, Navbar, Image, } from "react-bootstrap";

class NavBar extends React.Component {
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
    if (user) {
      return (
        <Menu.Menu style={{ paddingTop: "10px", paddingRight: "25px", paddingBottom: "10px" }} position='right'>
          <Header as='h4'>
            <Image  src={ user.image } roundedCircle />
            <Header.Content>
              { user.name } { user.nickname }
              <Dropdown>
                <Dropdown.Menu>
                  <Dropdown.Item href="/events/new" text='Add New Event' icon="add" />
                  <Dropdown.Item href="/users/:id" text='Account' icon="arrow right" />
                  <Dropdown.Item text='Notifications' icon="bell outline" />
                  <Dropdown.Item text='Logout' onClick={ () => handleLogout(this.props.history) } />
                </Dropdown.Menu>
              </Dropdown>
            </Header.Content>
          </Header>
        </Menu.Menu>
      )
    } else {
      return (
        <Menu.Menu position='right'>
          <Link to='/login'>
            <Menu.Item
              id='login'
              name='login'
              // active={location.pathname === '/login'}
            />
          </Link>
          <Link to='/register'>
            <Menu.Item
              id='register'
              name='register'
              // active={location.pathname === '/register'}
            />
          </Link>
        </Menu.Menu>
      )
    }
  }
  
  render() {
    return (
      <div>
        <Menu secondary>
          <Link to='/'>
            <Image style={{width: "100px", height: "80px", paddingLeft: "25px" }} src={logo} />
          </Link>
            { this.rightNavItems() }
        </Menu>
      </div>
    )
  }
}

export class ConnectedNavBar extends React.Component {
  render() {
    return (
      <AuthConsumer> 
        { auth => 
          <NavBar { ...this.props } auth={auth} />
        }
      </AuthConsumer>
    )
  }
}

export default withRouter(ConnectedNavBar);
