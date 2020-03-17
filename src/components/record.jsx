import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import RecordTable from "./recordTable";
import { getRecords } from "../services/recordsServices";

class Record extends Component {
  state = {
    records: [],
    currentPage: 1,
    pageSize: 4
  };

  async componentDidUpdate() {
    const { verseId, view } = this.props;
    const jwt = localStorage.getItem("token");
    let { data: records } = await getRecords(verseId, jwt);
    if (view === "shaikh") records = records.filter(e => e.isShaikh === true);
    else if (view === "labeled")
      records = records.filter(e => e.labeledBy[0] && e.isShaikh === false);
    else records = records.filter(e => !e.labeledBy[0] && e.isShaikh === false);
    this.setState({ records });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { records: data, currentPage, pageSize } = this.state;
    const records = paginate(data, currentPage, pageSize);
    return { totalCount: data.length, data: records };
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: records } = this.getPagedData();
    return (
      <div>
        <RecordTable view={this.props.view} records={records}></RecordTable>
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

export default Record;
