import React from "react";
import axios from "axios";
import party from "../images/party.jpg";
import styled, { keyframes, } from "styled-components";
import Search from './Search';
import Upcoming from "./Upcoming";
import "../styles/Explore.css";
import { AuthConsumer } from "../providers/AuthProvider";
import { Link, } from "react-router-dom";
import { CardDeck, } from "react-bootstrap";
import { Container, Button, Header, Segment, } from "semantic-ui-react";


class Explore extends React.Component {
  state = { events: [], page: 0 };

  componentDidMount() {
    axios.get(`/api/explore?page=${this.state.page}`)
      .then(res => {
        this.setState({ events: res.data })
      })
      .catch(err => {
        console.log(err)
      })
  };

  pageLeft = () => {
    const { auth: { user } } = this.props
    if (this.state.page > 0) {
      var next = this.state.page - 1
        axios.get(`/api/explore?page=${next}`)
          .then(res => {
            this.setState({ page: next, events: res.data })
          })
    }
  };

  pageRight = () => {
    const { auth: { user } } = this.props
    var next = this.state.page + 1
      axios.get(`/api/explore?page=${next}`)
        .then(res => {
          if (res.data.length > 0) {
            this.setState({ page: next, events: res.data })
          }
        })
  };

  render() {
    return (
      <ExplorePageElm>

        <div >
          <div className="explore-btns">
            <Button onClick={this.pageLeft} icon="left arrow"></Button>
            <p className="pagination2">Page: {this.state.page + 1}</p>
            <Button onClick={this.pageRight} icon="right arrow"></Button>
          </div>
          <div className="upcoming-outer">

            <div className="upcoming-explore">
              <CardDeck>

                {this.state.events.map(e => (
                  <Upcoming key={e.id} event={e} />
                ))}
              </CardDeck>
            </div>
          </div>
        </div>
      </ExplorePageElm>
    )
  }
};

const ConnectedExplore = (props) => (
  <AuthConsumer>
    {auth =>
      <Explore {...props} auth={auth} />
    }
  </AuthConsumer>
);

const slideInLeft = keyframes`
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
`;

const slideOutLeft = keyframes`
  from {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  to {
    visibility: hidden;
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
  }
`;

const Page = styled.div``;

const ExplorePageElm = styled(Page)`
  &.page-enter {
    animation: ${slideInLeft} 0.2s forwards;
  }
  &.page-exit {
    animation: ${slideOutLeft} 0.2s forwards;
  }
`;

export default ConnectedExplore;