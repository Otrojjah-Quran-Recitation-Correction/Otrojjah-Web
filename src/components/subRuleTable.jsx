import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class SubRuleTable extends Component {
  columns = [
    {
      path: "name",
      label: "name",
      content: item => <a href={`/showLetters/${item._id}`}> {item.name}</a>
    },
    {
      key: "edit",
      label: "edit",
      content: item => (
        <Link to={`/editRule/${item._id}`}>
          <button className="btn btn-info btn-sm">Edit</button>
        </Link>
      )
    }
  ];

  render() {
    const { subRules, onSort, sortColumn } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
        data={subRules}
      />
    );
  }
}

export default SubRuleTable;
