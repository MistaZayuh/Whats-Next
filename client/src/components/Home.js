import React from 'react';
import WhatsNext from "./WhatsNext";
import Upcoming from "./Upcoming";
import { Header, Container, } from 'semantic-ui-react';

const Home = () => (
  <>
  <br/>
  <br/>
  <br/>
  <br/>
 
 

  <p style={{ paddingLeft: "255px", color: "gray"}}>What's Next?</p>
  
  <WhatsNext />
  <br/>
  <br/>
  <p style={{ paddingLeft: "255px", color: "gray"}}>Upcoming Events.</p>
  <Upcoming />
  </>
)

export default Home;
