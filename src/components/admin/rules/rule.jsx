import React, { Component } from "react";
import { Link } from "react-router-dom";
import RuleTable from "./ruleTable";
import { getRules } from "../../../services/rulesServices";
import _ from "lodash";

class Rule extends Component {
  state = {
    rules: [],
    ruleId: "",
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidUpdate(prevProps, prevState) {
    const ruleId = this.props.ruleId;
    if (!prevState.rules[0]) {
      const { data: rules } = await getRules(ruleId);
      this.setState({ rules, ruleId });
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSortedData = () => {
    const { rules: data, sortColumn } = this.state;
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    return { data: sorted };
  };

  render() {
    const { sortColumn } = this.state;
    const { data: rules } = this.getSortedData();
    return (
      <div>
        <Link to={`/addRule/${this.state.ruleId}`}>
          <button className="my-2 action_btn">Add Rule</button>
        </Link>
        <RuleTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          rules={rules}
        ></RuleTable>
      </div>
    );
  }
}

export default Rule;
