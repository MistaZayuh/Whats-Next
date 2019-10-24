import React from "react";
import axios from "axios";
import Upcoming from "./Upcoming";
import "../styles/Explore.css";
import { AuthConsumer } from "../providers/AuthProvider";
import { CardDeck, } from "react-bootstrap";
import { Button } from "semantic-ui-react";

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
      axios.get(`/api/explore?specificuserid=${user.id}&page=${next}`)
        .then(res => {
          this.setState({ page: next, events: res.data })
        })
    }
  };

  pageRight = () => {
    const { auth: { user } } = this.props
    var next = this.state.page + 1
    axios.get(`/api/explore?specificuserid=${user.id}&page=${next}`)
      .then(res => {
        if (res.data.length > 0) {
          this.setState({ page: next, events: res.data })
        }
      })
  };

  render() {
    return (
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


export default ConnectedExplore;