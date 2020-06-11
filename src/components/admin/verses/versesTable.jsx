import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class VersesTable extends Component {
  columns = [
    {
      path: "name",
      label: "name",
      content: item => (
        <Link style={{ color: "#c09048" }} to={`/showRecords/${item._id}`}>
          {" "}
          {item.name}
        </Link>
      )
    },
    { path: "surah", label: "surah" },
    {
      key: "edit",
      label: "edit",
      content: item => (
        <Link to={`/editVerse/${item._id}`}>
          <button className="action_btn">Edit</button>
        </Link>
      )
    },
    {
      key: "delete",
      label: "delete",
      content: item => (
        <button
          className="action_btn"
          onClick={() => this.props.handleAlert(item)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { verses, onSort, sortColumn } = this.props;
    return (
      <Table
        sortColumn={sortColumn}
        onSort={onSort}
        columns={this.columns}
        data={verses}
      />
    );
  }
}

export default VersesTable;
