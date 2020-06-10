import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class UsersTable extends Component {
  columns = [
    { path: "name", label: "name" },
    { path: "email", label: "email" },
    {
      key: "role",
      label: "role",
      content: item => (
        <React.Fragment>
          {item.isAdmin && <p>admin</p>}
          {item.isShaikh && <p>shaikh</p>}
          {!item.isAdmin && !item.isShaikh && <p>client</p>}
        </React.Fragment>
      )
    },
    { path: "phoneNumber", label: "phoneNumber" },
    {
      key: "edit",
      label: "edit",
      content: item => (
        <Link to={`/editUser/${item._id}`}>
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
