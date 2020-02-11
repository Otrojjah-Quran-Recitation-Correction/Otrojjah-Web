import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class ShaikhTable extends Component {
  columns = [
    {
      label: "record",
      content: item => (
        <audio controls>
          <source src={item.link} type="audio/wav" />
        </audio>
      )
    },
    { label: "shaikhName" },
    { label: "ayah" },
    { label: "hokm" },
    {
      label: "edit",
      content: item => (
        <Link to={`/editShaikhRecord/${item._id}`}>
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
    const { shaikhRecords } = this.props;
    return <Table columns={this.columns} data={shaikhRecords} />;
  }
}

export default ShaikhTable;
