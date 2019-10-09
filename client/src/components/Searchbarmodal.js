import React from "react";
import axios from "axios";
// import Search from './Search';
import { Table, Button, Search, } from "semantic-ui-react";
import { Modal } from "react-bootstrap";

class SearchBarModal extends React.Component {
  state = { events: [], filtered: [], search: "", time: "", date: "", };

  listEvents = () => {
    return this.state.events.map(event => {
      return (
        <Table.Row>
          <Table.Cell>{event.event_name}</Table.Cell>
        </Table.Row>
      )
    })
  }
  searchEvent = (e, search) => {
    e.preventDefault()

    axios.get(`api/events?column=${this.state.column}&search=${search}`)
      .then(res => {
        this.setState({ events: res.data })
      })
      .catch(err => { })
  }

  
  render() {
    return (
      <div>
        <Modal {...this.props}>
          <Modal.Header closeButton >
            <Modal.Body>

       <Search
       size="sm"
            input={{ icon: 'search', iconPosition: 'left' }} />
            </Modal.Body>
          </Modal.Header>
          {/* <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
            Close</Button>
          </Modal.Footer> */}

        </Modal>
      </div>
    )
  }
}

export default SearchBarModal;