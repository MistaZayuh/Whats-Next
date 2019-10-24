import React from "react";
import "../styles/EventView.css";

class Clock extends React.Component {
    state = {days: 0, hours: 0, minutes: 0, seconds: 0,}


  componentWillMount() {
    this.getTimeUntil(this.props.deadline)
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
  }

          
  getTimeUntil(deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date());
    const seconds = Math.floor((time/1000) % 60);
    const minutes = Math.floor((time/1000/60) % 60);
    const hours = Math.floor(time/(1000*60*60) % 24);
    const days = Math.floor (time/(1000*60*60*24));

    this.setState({days, hours, minutes, seconds,})
  }


     render() {
         const { days, hours, minutes, seconds, } = this.state;
         return(
           <>
           <div className="countdown-labels">
             <p>days</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <p>hours</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
             <p>minutes</p>&nbsp;&nbsp;&nbsp;&nbsp;
             <p>seconds</p>
           </div>
          <div className="countdown-event-all">
          <div className="countdown-day"><h2>{days}</h2></div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="countdown-hour"><h2>{hours}</h2></div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="countdown-minute"><h2>{minutes}</h2></div>&nbsp;&nbsp;&nbsp;&nbsp;
          <div className="countdown-second"><h2>{seconds}</h2></div>&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
              </>
         );
     };
};

export default Clock;