import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class LetterTable extends Component {
  columns = [
    {
      path: "name",
      label: "name",
      content: item => (
        <Link style={{ color: "#bf8e4b" }} to={`/showVerses/${item._id}`}>
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
    const { letters, onSort, sortColumn } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
        data={letters}
      />
    );
  }
}

export default LetterTable;
