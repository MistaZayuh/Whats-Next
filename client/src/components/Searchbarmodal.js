import React from "react";
import axios from "axios";
// import Searching from './Search';
import { Table, Button, Search, } from "semantic-ui-react";
import { Modal } from "react-bootstrap";

class SearchBarModal extends React.Component {
  state = { events: [], search: "", };

  // listEvents = () => {
  //   return this.state.events.map(event => {
  //   })
  // }

  searchEvent = (e, search) => {
    e.preventDefault()
    axios.get(`api/events?search=${search.value}`)
      .then(res => {
        this.setState({ events: res.data, search })
      })
      .catch(err => { })
  }

  // handleResultSelect = (e, { results }) => this.setState({ search: results.event_name })

  render() {
    const { search, events } = this.state

    return (
      <div>
        <Modal {...this.props}>
          <Modal.Header closeButton >
            <Modal.Body>
              <Search
                size="sm"
                input={{ icon: 'search', iconPosition: 'left' }}
                onSearchChange={this.searchEvent}
                // onResultSelect={this.handleResultSelect}
                events={events}
                search={search}
              />
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </div>
    )
  }
}

export default SearchBarModal;