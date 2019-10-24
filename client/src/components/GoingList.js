import React from "react";
// import styled from "styled-components";
import { Segment, Image } from "semantic-ui-react";



class GoingList extends React.Component {
  state = { users: [], };

  componentDidMount() {
    this.setState({users: this.props.users})
  };

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({users: this.props.users})
    }
  };


  render() {
    return (
      <Segment.Group>
        <Segment
        style={{opacity: "0.5"}}
        >
          <strong>

          GOING - {this.state.users.length}
          </strong>
        </Segment>
        <Segment.Group style={{overflowX: "auto", height: "200px"}}>
          {this.state.users.map(u => (
            <Segment key={u.id}>
              {/* <div style={{display: "flex", }}> */}

              <Image src={u.image} size="mini" circular avatar />
              <span>{u.name}</span>
              {/* </div> */}
            </Segment>
          
          ))}
        </Segment.Group>
      </Segment.Group>
    )
  }
}

// const UserSegment = styled(Segment)`
//   display: flex;
//   justify-content: space-between;
// `;

// const UserImage = styled(Image)`
//   height: 35%;
//   width: 35%
// `;

export default GoingList;