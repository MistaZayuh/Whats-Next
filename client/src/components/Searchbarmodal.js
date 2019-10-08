import React from "react";
import Axios from "axios";
import Search from './Search';
import { Table, } from "semantic-ui-react";

class Searchbar extends React.Component {
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

    Axios.get(`api/events?column=${this.state.column}&search=${search}`)
      .then(res => {
        this.setState({ events: res.data })
      })
      .catch(err => { })
  }


  render() {
    return (
      <div>
        <Search searchEvent={this.searchEvent} Icon="search" />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.Header>Event Name</Table.Header>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.listEvents()}
          </Table.Body>
        </Table>
      </div>
    )
  }
}