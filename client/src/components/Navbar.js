import React from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Icon, Dropdown, Header, Button, } from 'semantic-ui-react';
import { Link, withRouter, } from 'react-router-dom';
import logo from "../images/logo.png";
import { Nav, Navbar, Image, Modal, } from "react-bootstrap";
import EventFormModal from "./EventFormModal";
import axios from 'axios';
import Search from "./Search";
import SearchBarModal from './Searchbarmodal';


class NavBar extends React.Component {
  state = { showEventModal: false, showSearchModal: false, };

  eventModalClose =() => {
  }
  eventSearchClose =() => {
  }


  searchEvent = (e, search) => {
    e.preventDeafult()

    axios.get(`api/events?column=${this.state.column}&search=${search}`)
      .then(res => {
        this.setState({ events: res.data })
      })
  }

  // searchEvent={this.searchEvent}
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, }, location, } = this.props;
    
        if (user) {
      return (
        <Menu.Menu style={{ paddingTop: "10px", paddingRight: "25px", paddingBottom: "10px" }} position='right'>
          <Header as='h4'>
            <Menu.Item>
              <Header as="h4">
              <Icon onClick={ () => this.setState({showSearchModal: true}) } name="search" style={{paddingTop: "10px"}}/>
              </Header>
              <Button  color="blue" onClick={ () => this.setState({showEventModal: true})}>Create New Event</Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Image  src={ user.image } roundedCircle />
            <Header.Content>
              <Dropdown>
                <Dropdown.Menu>
                  {/* <Dropdown.Item href="/events/new" text='Add New Event' icon="add" /> */}
                  <Dropdown.Item href={`/users/${user.id}`} text='Account' icon="arrow right" />
                  <Dropdown.Item text='Notifications' icon="bell outline" />
                  <Dropdown.Item text='Logout' onClick={ () => handleLogout(this.props.history) } icon="log out" />
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
    let searchModalClose = () => this.setState({ showSearchModal: false, })
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
         <SearchBarModal
         show={this.state.showSearchModal}
         onHide={searchModalClose} />
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
