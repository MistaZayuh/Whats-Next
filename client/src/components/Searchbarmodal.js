import React from "react";
import axios from "axios";
import UpcomingSearch from "./UpcomingSearch"
import Searching from './Search';
import { Modal, Table, CardDeck } from "react-bootstrap";

class SearchBarModal extends React.Component {
  state = { events: [], };

  searchEvent = (e, search) => {
    e.preventDefault();
    this.setState({ events: [] })
    axios.get(`/api/event_search?search=${search}`)
      .then(res => {
        this.setState({ events: res.data, })
      })
      .catch(err => {
        console.log(err)
      })
  };

  eventSelected = (e) => {
    this.setState({ events: [], })
  }

  render() {
    const { events } = this.state;
    return (
      <div>
        <Modal {...this.props} style={{overflowX: "auto"}} >
          <Modal.Header closeButton >
            <Modal.Body>
              <Searching
                size="sm"
                // icon="search"
                input={{ fluid: true }}
                searchEvent={this.searchEvent}
              />
              <br/>
              <div style={{width: "510px"}}>
              <CardDeck>
                  {events.map(e => (
                    <div>
                      <UpcomingSearch key={e.id} event={e} onHide={this.props.onHide} clearEvents={this.eventSelected} />
                      <br/>
                    </div>
                  ))}
                  </CardDeck>
              </div>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </div>
    )
  }
}

export default SearchBarModal;