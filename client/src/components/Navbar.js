import React from 'react';
import { AuthConsumer, } from "../providers/AuthProvider";
import { Menu, Icon, Dropdown, Header, Button, } from 'semantic-ui-react';
import { Link, withRouter, } from 'react-router-dom';
import logo from "../images/logo.png";
import logo_w from "../images/logo_w.png";
import { Image } from "react-bootstrap";
import EventFormModal from "./EventFormModal";
import SearchBarModal from './Searchbarmodal';
import "../styles/Navbar.css";

const defaultImage = 'https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png';

class NavBar extends React.Component {
  state = { showEventModal: false, showSearchModal: false, };

  eventModalClose =() => {
  }
  eventSearchClose =() => {
  }


  // searchEvent={this.searchEvent}
  
  rightNavItems = () => {
    const { auth: { user, handleLogout, } } = this.props;
    
        if (user) {
      return (
        <Menu.Menu style={{ paddingTop: "10px", paddingRight: "25px", paddingBottom: "10px", zIndex: "999", }} position='right'>
          <Header as='h4'>
            <Menu.Item>
              
                {this.props.location.pathname.match(/.events.[0-9]{1,}$/) ?
              <>
              <Header as="h4">
              <Icon className="my-icon"  onClick={ () => this.setState({showSearchModal: true}) } name="search" style={{paddingTop: "10px",}}/>
              </Header>
              <Button  style={{background: "#6d6d6d85", color: "white"}} onClick={ () => this.setState({showEventModal: true})}>Create New Event</Button>
              </>
              :
              <>
              <Header as="h4">

              <Icon color="black" onClick={ () => this.setState({showSearchModal: true}) } name="search" style={{paddingTop: "10px"}}/>
              </Header>
              
              <Button  color="blue" onClick={ () => this.setState({showEventModal: true})}>Create New Event</Button>

            </>
            }
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Image  src={ user.image || defaultImage } roundedCircle />
            <Header.Content>
              <Dropdown>
                <Dropdown.Menu>
                  {/* <Dropdown.Item href="/events/new" text='Add New Event' icon="add" /> */}
                  <Dropdown.Item href={`/users/${user.id}`} text='Account' icon="arrow right" />
                  <Dropdown.Item text='Explore' icon="globe" href={"/"} />
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
        <Menu.Menu style={{zIndex: "999"}} position='right'>
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
        <Menu style={{zIndex: "999"}} secondary>
          <Link style={{zIndex: "999"}} to='/dashboard'>
            {this.props.location.pathname.match(/.events.[0-9]{1,}$/) ?
            <Image style={{ zIndex: "1000", width: "100px", height: "80px", paddingLeft: "25px" }} src={logo_w} />
            :
            <Image style={{ zIndex: "1000", width: "100px", height: "80px", paddingLeft: "25px" }} src={logo} />
          }
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
