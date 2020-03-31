import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class VersesTable extends Component {
  columns = [
    {
      path: "name",
      label: "name",
      content: item => <a href={`/showRecords/${item._id}`}> {item.name}</a>
    },
    { path: "surah", label: "surah" },
    {
      key: "edit",
      label: "edit",
      content: item => (
        <Link to={`/editVerse/${item._id}`}>
          <button className="btn btn-info btn-sm">Edit</button>
        </Link>
      )
    },
    {
      key: "delete",
      label: "delete",
      content: item => (
        <button
          className="btn btn-danger btn-sm"
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
