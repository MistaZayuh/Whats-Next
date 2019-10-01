import React from 'react';
import { Header, } from 'semantic-ui-react';
import EventForm from "./EventForm";

class Home extends React.Component {

  render(){
    return(

      
      
      <>
  <Header as="h3" textAlign="center">Devise Auth App</Header>

  <EventForm />
  </>
      )
  }
}

export default Home;
