import React, { Component } from "react";
import Verse from "./verse";

class ShowVerses extends Component {
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
          <Verse jwt={jwt} ruleId={ruleId}></Verse>
        </div>
      </div>
    );
  }
}

export default ShowVerses;
