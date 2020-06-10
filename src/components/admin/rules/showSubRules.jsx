import React, { Component } from "react";
import SubRule from "./subRule";

class ShowSubRules extends Component {
  state = { jwt: "", ruleId: "" };

  async componentDidMount() {
    const ruleId = this.props.match.params.id;
    const jwt = localStorage.getItem("token");
    this.setState({ jwt, ruleId });
  }

  render() {
    const { jwt, ruleId } = this.state;
    return (
      <div>
        <div className="rule container mb-5 py-5">
          <SubRule jwt={jwt} ruleId={ruleId}></SubRule>
        </div>
      </div>
    );
  }
}

export default ShowSubRules;
