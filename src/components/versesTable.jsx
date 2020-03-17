import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class VersesTable extends Component {
  columns = [
    {
      label: "name",
      content: item => (
        <a href={`/showClientRecords/${item._id}`}> {item.name}</a>
      )
    },
    { label: "surah" },
    {
      label: "edit",
      content: item => (
        <Link to={`/editVerse/${item._id}`}>
          <button className="btn btn-info btn-sm">Edit</button>
        </Link>
      )
    },
    {
      label: "delete",
      content: item => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => this.props.handleDelete(item)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { verses } = this.props;
    return <Table columns={this.columns} data={verses} />;
  }
}

export default VersesTable;
