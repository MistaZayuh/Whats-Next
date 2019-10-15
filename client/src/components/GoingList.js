import React from "react";
import styled from "styled-components";
import { Segment, Image, Header } from "semantic-ui-react";



class GoingList extends React.Component {


  render() {
    return (
      <Segment.Group>
        <Segment >
          Going -
        </Segment>
        <Segment.Group>
          {this.props.users.map(u => (
         
            <Segment>
              <div style={{display: "flex", }}>

                <Image src={u.userimage} size="mini" circular />
                <p>{u.username}</p>
              </div>
            </Segment>
          
          ))}
        </Segment.Group>
      </Segment.Group>
    )
  }
}

export default GoingList;