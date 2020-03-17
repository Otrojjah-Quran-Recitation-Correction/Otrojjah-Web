import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class RuleTable extends Component {
  columns = [
    {
      label: "name",
      content: item => <a href={`/showSubRules/${item._id}`}> {item.name}</a>
    },
    {
      label: "edit",
      content: item => (
        <Link to={`/editRule/${item._id}`}>
          <button className="btn btn-info btn-sm">Edit</button>
        </Link>
      )
    }
  ];

  render() {
    const { rules } = this.props;
    return <Table columns={this.columns} data={rules} />;
  }
}

export default RuleTable;
