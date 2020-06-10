import React, { Component } from "react";
import { Link } from "react-router-dom";
import LetterTable from "./letterTable";
import { getRules } from "../../../services/rulesServices";
import _ from "lodash";

class Letter extends Component {
  state = {
    letters: [],
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidUpdate(prevProps, prevState) {
    const ruleId = this.props.ruleId;
    if (!prevState.letters[0]) {
      const { data: letters } = await getRules(ruleId);
      this.setState({ letters });
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSortedData = () => {
    const { letters: data, sortColumn } = this.state;
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    return { data: sorted };
  };

  render() {
    const { sortColumn } = this.state;
    const { data: letters } = this.getSortedData();
    return (
      <div className="mt-5">
        <Link to={`/addRule/${this.props.ruleId}`}>
          <button className="my-2 action_btn">Add Rule</button>
        </Link>
        <LetterTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          letters={letters}
        ></LetterTable>
      </div>
    );
  }
}

export default Letter;
