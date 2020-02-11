import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ShaikhTable from "./shaikhTable";
import { paginate } from "../utils/paginate";
import {
  getShaikhRecords,
  deleteShaikhRecord
} from "../services/shaikhRecordsServices";

class Shaikh extends Component {
  state = {
    shaikhRecords: [],
    shaikhRecord: {},
    currentPage: 1,
    pageSize: 4
  };

  async componentDidMount() {
    const { data: shaikhRecords } = await getShaikhRecords();
    this.setState({ shaikhRecords });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { shaikhRecords: data, currentPage, pageSize } = this.state;
    const shaikhRecords = paginate(data, currentPage, pageSize);
    return { totalCount: data.length, data: shaikhRecords };
  };

  handleDelete = async shaikhRecord => {
    const shaikhRecords = this.state.shaikhRecords.filter(
      e => e._id !== shaikhRecord._id
    );
    this.setState({ shaikhRecords });
    await deleteShaikhRecord(shaikhRecord);
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: shaikhRecords } = this.getPagedData();

    return (
      <div>
        <p>Showing {totalCount} shaikh records in the database.</p>
        <Link to={`/downloadShaikhRecords`}>
          <button className="my-2 btn btn-warning">Add Records</button>
        </Link>
        <ShaikhTable
          shaikhRecords={shaikhRecords}
          handleDelete={this.handleDelete}
        ></ShaikhTable>
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

export default Shaikh;
