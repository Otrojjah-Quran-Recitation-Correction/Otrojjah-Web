import React, { Component } from "react";
import Pagination from "./common/Pagination";
import UsersTable from "./UsersTable";
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
    const { data: users } = await getUsers();
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
    this.setState({ users });
    await deleteUser(user);
  };

  render() {
    const { pageSize, currentPage, user } = this.state;

    const { totalCount, data: users } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} users in the database.</p>
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