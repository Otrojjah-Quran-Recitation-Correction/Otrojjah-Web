import React, { Component } from "react";
import { Link } from "react-router-dom";
import LetterTable from "./letterTable";
import { getRules } from "../services/rulesServices";

class Letter extends Component {
  state = {
    letters: []
  };

  async componentDidUpdate() {
    const ruleId = this.props.ruleId;
    const { data: letters } = await getRules(ruleId);
    this.setState({ letters });
  }

  render() {
    return (
      <div>
        <Link to={`/addRule/${this.props.ruleId}`}>
          <button className="my-2 btn btn-warning">Add Rule</button>
        </Link>
        <LetterTable letters={this.state.letters}></LetterTable>
      </div>
    );
  }
}

export default Letter;
