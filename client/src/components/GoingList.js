import React from "react";
import {Segment,} from "semantic-ui-react";



class GoingList extends React.Component {


  render() {
    return(
      <Segment.Group>
        <Segment >
          Going -
        </Segment>
          <Segment.Group>
            <Segment>Person 1</Segment>
            <Segment>Person 2</Segment>
            <Segment>Person 3</Segment>
          </Segment.Group>
      </Segment.Group>
    )
  }
}

export default GoingList;