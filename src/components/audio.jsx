import React, { Component } from "react";

class Audio extends Component {
  state = {};
  render() {
    return (
      <audio controls style={{ display: "block" }}>
        <source src={this.props.link} type="audio/wav" />
      </audio>
    );
  }
}

export default Audio;
