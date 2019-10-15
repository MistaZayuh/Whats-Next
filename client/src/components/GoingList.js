import React from "react";
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
        <Segment >
          Going -
        </Segment>
        <Segment.Group>
          {this.state.users.map(u => (
            <Segment key={u.id}>
              <Image src={u.image} />
              <p>{u.name}</p>
            </Segment>
          ))}
        </Segment.Group>
      </Segment.Group>
    )
  }
}

export default GoingList;