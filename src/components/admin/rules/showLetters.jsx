import React, { Component } from "react";
import Letter from "./letter";

class ShowLetters extends Component {
  state = { jwt: "", ruleId: "" };

  async componentDidMount() {
    const ruleId = this.props.match.params.id;
    const jwt = localStorage.getItem("token");
    this.setState({ jwt, ruleId });
  }

  render() {
    const { jwt, ruleId } = this.state;
    return (
      <div className="py-5">
        <div className="mainComponent container my-5 py-5">
          <Letter jwt={jwt} ruleId={ruleId}></Letter>
        </div>
      </div>
    );
  }
}

export default ShowLetters;
