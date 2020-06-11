import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class SubRuleTable extends Component {
  columns = [
    {
      path: "name",
      label: "name",
      content: item => (
        <Link style={{ color: "#c09048" }} to={`/showLetters/${item._id}`}>
          {" "}
          {item.name}
        </Link>
      )
    },
    {
      key: "edit",
      label: "edit",
      content: item => (
        <Link to={`/editRule/${item._id}`}>
          <button className="action_btn">Edit</button>
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
