import React, { Component } from "react";
import { Link } from "react-router-dom";
import RuleTable from "./ruleTable";
import { getRules } from "../services/rulesServices";

class Rule extends Component {
  state = {
    rules: [],
    ruleId: ""
  };

  async componentDidUpdate() {
    const ruleId = this.props.ruleId;
    const { data: rules } = await getRules(ruleId);
    this.setState({ rules, ruleId });
  }

  render() {
    return (
      <div>
        <Link to={`/addRule/${this.state.ruleId}`}>
          <button className="my-2 btn btn-warning">Add Rule</button>
        </Link>
        <RuleTable rules={this.state.rules}></RuleTable>
      </div>
    );
  }
}

export default Rule;
