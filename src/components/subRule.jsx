import React, { Component } from "react";
import { Link } from "react-router-dom";
import SubRuleTable from "./subRuleTable";
import { getRules } from "../services/rulesServices";
import _ from "lodash";

class SubRule extends Component {
  state = {
    subRules: [],
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidUpdate(prevProps, prevState) {
    const ruleId = this.props.ruleId;
    if (!prevState.subRules[0]) {
      const { data: subRules } = await getRules(ruleId);
      this.setState({ subRules });
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSortedData = () => {
    const { subRules: data, sortColumn } = this.state;
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    return { data: sorted };
  };

  render() {
    const { sortColumn } = this.state;
    const { data: subRules } = this.getSortedData();
    return (
      <div>
        <Link to={`/addRule/${this.props.ruleId}`}>
          <button className="my-2 btn btn-warning">Add Rule</button>
        </Link>
        <SubRuleTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          subRules={subRules}
        ></SubRuleTable>
      </div>
    );
  }
}

export default SubRule;
