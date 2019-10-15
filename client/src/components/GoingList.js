import React from "react";
import { Segment, Image } from "semantic-ui-react";
import styled from "styled-components";



class GoingList extends React.Component {


  render() {
    return (
      <Segment.Group>
        <Segment >
          Going -
        </Segment>
        <Segment.Group>
          {this.props.users.map(u => (
            <UserSegment>
              <UserImage src={u.userimage} />
              <p>{u.username}</p>
            </UserSegment>
          ))}
        </Segment.Group>
      </Segment.Group>
    )
  }
}

const UserSegment = styled(Segment)`
  display: flex;
  justify-content: space-between;
`;

const UserImage = styled(Image)`
  height: 35%;
  width: 35%
`;

export default GoingList;