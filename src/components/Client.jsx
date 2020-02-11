import React, { Component } from "react";
import Pagination from "./common/pagination";
import ClientsTable from "./clientsTable";
import { paginate } from "../utils/paginate";
import { getClients, deleteClient } from "../services/clientsServices";

class Client extends Component {
  state = {
    clients: [],
    currentPage: 1,
    pageSize: 4
  };

  async componentDidMount() {
    const { data: clients } = await getClients();
    this.setState({ clients });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { clients: data, currentPage, pageSize } = this.state;
    const clients = paginate(data, currentPage, pageSize);
    return { totalCount: data.length, data: clients };
  };

  handleDelete = async client => {
    const clients = this.state.clients.filter(e => e._id !== client._id);
    this.setState({ clients });
    await deleteClient(client);
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: clients } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} client records in the database.</p>
        <ClientsTable
          clients={clients}
          handleDelete={this.handleDelete}
        ></ClientsTable>
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

export default Client;
