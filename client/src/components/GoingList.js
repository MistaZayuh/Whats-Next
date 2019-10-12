import React from "react";
import { Segment, Image } from "semantic-ui-react";



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
              <Image src={u.userimage} />
              <p>{u.username}</p>
            </Segment>
          ))}
        </Segment.Group>
      </Segment.Group>
    )
  }
}

export default GoingList;