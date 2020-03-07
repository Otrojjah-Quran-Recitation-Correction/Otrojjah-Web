import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class UsersTable extends Component {
  columns = [
    { label: "name" },
    { label: "email" },
    { label: "phoneNumber" },
    {
      label: "edit",
      content: item => (
        <Link to={`/editUser/${item._id}`}>
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
    const { users } = this.props;
    return <Table columns={this.columns} data={users} />;
  }
}

export default UsersTable;
