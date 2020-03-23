import React, { Component } from "react";
import { Link } from "react-router-dom";
import SubRuleTable from "./subRuleTable";
import { getRules } from "../services/rulesServices";

class SubRule extends Component {
  state = {
    subRules: []
  };

  async componentDidUpdate(prevProps, prevState) {
    const ruleId = this.props.ruleId;
    if (!prevState.subRules[0]) {
      const { data: subRules } = await getRules(ruleId);
      this.setState({ subRules });
    }
  }

  render() {
    return (
      <div>
        <Link to={`/addRule/${this.props.ruleId}`}>
          <button className="my-2 btn btn-warning">Add Rule</button>
        </Link>
        <SubRuleTable subRules={this.state.subRules}></SubRuleTable>
      </div>
    );
  }
}

export default SubRule;
