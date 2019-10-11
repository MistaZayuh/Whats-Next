import React from "react";
import axios from "axios";
import Upcoming from "./Upcoming"
import Searching from './Search';
import { Modal, Table } from "react-bootstrap";

class SearchBarModal extends React.Component {
  state = { events: [], search: "", };

  // listEvents = () => {
  //   return this.state.events.map(event => {
  //   })
  // }

  searchEvent = (e, search) => {
    e.preventDefault();
    axios.get(`api/events?search=${search}`)
    .then(res => {
      debugger
      this.setState({ events: res.data, search })
    })
    .catch(err => { 
      debugger


      })
  }

  render() {
    const { search, events } = this.state

    return (
      <div>
        <Modal {...this.props}>
          <Modal.Header closeButton >
            <Modal.Body>
              <Searching
                size="sm"
                input={{ icon: 'search', iconPosition: 'left' }}
                searchEvent={this.searchEvent}
                events={events}
                search={search}
              />
              <Table>
                <thead>
                  <td>
                    {events.map(e => (
                      <Upcoming key={e.id} event={e} />

                    ))}
                  </td>
                </thead>
              </Table>
            </Modal.Body>
          </Modal.Header>
        </Modal>
      </div>
    )
  }
}

export default SearchBarModal;