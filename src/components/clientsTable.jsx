import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class ClientsTable extends Component {
  columns = [
    {
      label: "record",
      content: item => (
        <audio controls>
          <source src={item.link} type="audio/wav" />
        </audio>
      )
    },
    { label: "recordName" },
    { label: "ayah" },
    { label: "hokm" },
    {
      label: "edit",
      content: item => (
        <Link to={`/editClient/${item._id}`}>
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
    const { clients } = this.props;

    return <Table columns={this.columns} data={clients} />;
  }
}

export default ClientsTable;
