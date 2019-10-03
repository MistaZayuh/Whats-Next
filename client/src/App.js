import React from 'react';
import Home from './components/Home';
import NoMatch from './components/NoMatch';
import NavBar from './components/Navbar';
import UserForm from "./components/UserForm";
import Login from './components/Login';
import EventForm from "./components/EventForm";
import EventView from "./components/EventView";
import Register from './components/Register';
import FetchUser from './components/FetchUser';
import ProtectedRoute from './components/ProtectedRoute';
import { Switch, Route, } from 'react-router-dom';
import { Container, } from "semantic-ui-react";

const App = () => (
  <>
    <NavBar />
    <FetchUser>
      <Container>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/events/new" component={EventForm} />
          <ProtectedRoute exact path="/events/:id/edit" component={EventForm} />
          <ProtectedRoute exact path="/events/:id" component={EventView} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/users/:id/edit" component={UserForm} />
          <Route component={NoMatch} />
        </Switch>
      </Container>
    </FetchUser>
  </>
)

export default App;