import React from 'react'
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Icon, Dropdown, Header, Button, } from 'semantic-ui-react'
import { Link, withRouter, } from 'react-router-dom'
import logo from "../images/logo.png"
import { Nav, Navbar, Image, Modal, } from "react-bootstrap";
import EventFormModal from "./EventFormModal";


class NavBar extends React.Component {
  state = { showEventModal: false, };

  eventModalClose =() => {
    debugger
  }
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
        if (user) {
      return (
        
        <Menu.Menu style={{ paddingTop: "10px", paddingRight: "25px", paddingBottom: "10px" }} position='right'>
          <Header as='h4'>
            <Menu.Item>
              <Header as="h4">
              <Icon link="/events/new" name="search" />
              </Header>
              <Button color="blue" onClick={ () => this.setState({showEventModal: true})}>Create New Event</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Image  src={ user.image } roundedCircle />
            <Header.Content>
              <Dropdown>
                <Dropdown.Menu>
                  <Dropdown.Item href="/users/:id" text='Account' />
                  {/* <Dropdown.Item text='Notifications' icon="bell outline" /> */}
                  <Dropdown.Item text='Logout' onClick={ () => handleLogout(this.props.history) } />
                </Dropdown.Menu>
              </Dropdown>
            </Header.Content>
            </Menu.Item>
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
    let eventModalClose = () => this.setState({ showEventModal: false, })
    return (
      <>
        <Menu secondary>
          <Link to='/'>
            <Image style={{width: "100px", height: "80px", paddingLeft: "25px" }} src={logo} />
          </Link>
            { this.rightNavItems() }
        </Menu>
        <EventFormModal
        show={this.state.showEventModal}
        onHide={eventModalClose}
         />
         </>
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
