import React from "react";
import axios from "axios";
import Upcoming from "./Upcoming"
import Searching from './Search';
import { Modal, Table } from "react-bootstrap";

class SearchBarModal extends React.Component {
  state = { events: [], };

  searchEvent = (e, search) => {
    e.preventDefault();
    axios.get(`api/events?search=${search}`)
      .then(res => {
        this.setState({ events: res.data, })
      })
      .catch(err => {
        console.log(err)
      })
  };

  render() {
    const { events } = this.state;
    return (
      <div>
        <Modal {...this.props}>
          <Modal.Header closeButton >
            <Modal.Body>
              <Searching
                size="sm"
                input={{ icon: 'search', iconPosition: 'left', fluid: true }}
                searchEvent={this.searchEvent}
                
              />
              <Table>
                <thead>
                  {events.map(e => (
                    <td>
                      <Upcoming key={e.id} event={e} />
                    </td>
                  ))}
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