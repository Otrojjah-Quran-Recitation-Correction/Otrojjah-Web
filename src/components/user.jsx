import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import UsersTable from "./usersTable";
import SearchBox from "./common/searchBox";
import { paginate } from "../utils/paginate";
import { getUsers, deleteUser } from "../services/usersServices";

class User extends Component {
  state = {
    users: [],
    user: {},
    currentPage: 1,
    pageSize: 4,
    searchQuery: ""
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data: users } = await getUsers(jwt);
    this.setState({ users });
  }

  handlePageChange = (page, type = "", pagesCount) => {
    if (type === "prev" && page !== 1) this.setState({ currentPage: page - 1 });
    else if (type === "next" && page < pagesCount)
      this.setState({ currentPage: page + 1 });
    else this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const { users: data, currentPage, pageSize, searchQuery } = this.state;
    let filtered = data;
    if (searchQuery)
      filtered = data.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const users = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, data: users };
  };

  handleDelete = async user => {
    const users = this.state.users.filter(e => e._id !== user._id);
    const jwt = this.props.jwt;
    this.setState({ users });
    await deleteUser(user, jwt);
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: users } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} users in the database.</p>
        <Link to={`/registerUser`}>
          <button className="my-2 btn btn-warning">Add User</button>
        </Link>
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
