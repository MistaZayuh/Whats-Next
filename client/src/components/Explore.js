import React from "react";
import Axios from "axios";
import party from "../images/party.jpg";
import styled from "styled-components";
import Search from './Search';
import { Link, } from "react-router-dom";
import { Card, } from "react-bootstrap";
import { Container, Table, Header, Segment, } from "semantic-ui-react";

// class Explore extends React.Component {
//   state = { events: [], filtered: [], search: "", time: "", date: "", };

  // componentDidMount() {
  //   Axios.get("/api/events")
  //     .then(res => {
  //       this.setState({ events: res.data, filtered: res.data, })
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }


  // handleChange(e) {
  //   this.setState({ search: e.target.value })
  //   let currentList = [];
  //   let newList = [];
  //   if (e.target.value !== "") {
  //     currentList = this.state.events;
  //     newList = currentList.filter(item => {
  //       const lc = item.name.toString().toLowerCase();
  //       const filter = e.target.value.toLowerCase();
  //       return lc.includes(filter);
  //     });
  //   } else {
  //     newList = this.state.events;
  //   }
  //   this.setState({
  //     filtered: newList
  //   });
  // }

  // listEvents = () => {
  //   return this.state.events.map(event => {
  //     return (
  //       <Table.Row>
  //         <Table.Cell>{event.event_name}</Table.Cell>
  //       </Table.Row>
  //     )
  //   })
  // }
  // searchEvent = (e, search) => {
  //   e.preventDefault()

  //   Axios.get(`api/events?column=${this.state.column}&search=${search}`)
  //     .then(res => {
  //       this.setState({ events: res.data })
  //     })
  //     .catch(err => {})
  // }


  // render() {
  //   return (
  //     <Container>
  //       <Header as="h1">Find new events!</Header>
  //       <div>
  //         <Search searchEvent={this.searchEvent} Icon="search" />
  //         <Table celled>
  //           <Table.Header>
  //             <Table.Row>
  //               <Table.Header>Event Name</Table.Header>
  //             </Table.Row>
  //           </Table.Header>
  //           <Table.Body>
  //             {this.listEvents()}
  //           </Table.Body>
  //         </Table>
  //       </div>
        {/* <Segment>
          <input
            placeholder="Seach..."
            value={this.state.search}
            name="search"
            onChange={(event) => this.handleChange(event)}
          />
        </Segment>
        <Container display="flex">
          {/* <Card.Group> */}
          {/* {this.state.filtered.map(e => ( */}
          {/* // <div key={e.id} style={{ paddingLeft: "248px" }}>
            //   <Link>
            //     <Card style={{ width: "200px", height: "100px" }} className="bg-dark text-white">
            //       <MyCardImage src={party} alt="event location" />
            //       <Card.ImgOverlay>
            //         <Card.Title>{e.name}</Card.Title>
            //         <br />
            //         <Card.Text>{e.date}</Card.Text>
            //       </Card.ImgOverlay>
            //     </Card>
            //   </Link>
            // </div> */}
          // ))
          // }
          {/* </Card.Group> */}
        {/* </Container> */}
      // </Container>
    // );
  // };
// };

const MyCardImage = styled(Card.Img)`
    width: 200px;
    height: 100px;
    filter: blur(2.5px) brightness(60%);
`;

export default Explore;