import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import NavBar from './components/Navbar';
import UserForm from "./components/UserForm";
import Login from './components/Login';
import Explore from "./components/Explore";
import EventForm from "./components/EventForm";
import EventView from "./components/EventView";
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import Refresh from "./components/Refresh";
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";
import "../src/App.css";

const App = () => (
  <>
  <div>
    <NavBar />
  </div>
    <FetchUser>
      {/* <Container> */}
        <Switch>
          <Route exact path="/" component={Explore} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/refresh" component={Refresh} />
          <ProtectedRoute exact path="/dashboard" component={Home} />
          <ProtectedRoute exact path="/events/new" component={EventForm} />
          <Route exact path="/events/:id" component={EventView} />
          <ProtectedRoute exact path="/events/:id/edit" component={EventForm} />
          <ProtectedRoute exact path="/users/:id" component={UserProfile} />
          <ProtectedRoute exact path="/users/:id/edit" component={UserForm} />
          <Route component={NoMatch} />
        </Switch>
      {/* </Container> */}
    </FetchUser>
  </>
)

export default App;