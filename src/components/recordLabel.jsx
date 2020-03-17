import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import RecordLabelTable from "./recordLabelTable";
import { getRecord } from "../services/recordsServices";

class RecordLabel extends Component {
  state = {
    record: {},
    labels: [],
    currentPage: 1,
    pageSize: 4
  };

  async componentDidUpdate() {
    const { recordId } = this.props;
    const jwt = localStorage.getItem("token");
    const { data: record } = await getRecord(recordId, jwt);
    const labels = record[0].labeledBy;
    this.setState({ record, labels });
  }

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { labels: data, currentPage, pageSize } = this.state;
    const labels = paginate(data, currentPage, pageSize);
    return { totalCount: data.length, data: labels };
  };

  render() {
    const { pageSize, currentPage } = this.state;

    const { totalCount, data: labels } = this.getPagedData();
    return (
      <div>
        <RecordLabelTable labels={labels}></RecordLabelTable>
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

export default RecordLabel;
