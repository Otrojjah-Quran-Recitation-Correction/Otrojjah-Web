import React, { Component } from "react";
import Pagination from "./common/Pagination";
import ClientsTable from "./ClientsTable";
import { paginate } from "../utils/paginate";
import { getClients } from "../services/clientsService";

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

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: clients } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} clients in the database.</p>
        <ClientsTable clients={clients}></ClientsTable>
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
