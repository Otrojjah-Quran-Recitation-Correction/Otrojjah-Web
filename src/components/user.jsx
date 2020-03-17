import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import UsersTable from "./usersTable";
import { paginate } from "../utils/paginate";
import { getUsers, deleteUser } from "../services/usersServices";

class User extends Component {
  state = {
    users: [],
    user: {},
    currentPage: 1,
    pageSize: 4
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data: users } = await getUsers(jwt);
    this.setState({ users });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { users: data, currentPage, pageSize } = this.state;
    const users = paginate(data, currentPage, pageSize);
    return { totalCount: data.length, data: users };
  };

  handleDelete = async user => {
    const users = this.state.users.filter(e => e._id !== user._id);
    const jwt = this.props.jwt;
    this.setState({ users });
    await deleteUser(user, jwt);
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: users } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} users in the database.</p>
        <Link to={`/registerUser`}>
          <button className="my-2 btn btn-warning">Add User</button>
        </Link>
        <UsersTable users={users} handleDelete={this.handleDelete}></UsersTable>
        <Pagination
          itemsCount={totalCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default User;
