import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class UsersTable extends Component {
  columns = [
    { path: "name", label: "name" },
    { path: "email", label: "email" },
    { path: "phoneNumber", label: "phoneNumber" },
    {
      key: "edit",
      label: "edit",
      content: item => (
        <Link to={`/editUser/${item._id}`}>
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
          onClick={() => this.props.handleDelete(item)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { users, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={users}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default UsersTable;
