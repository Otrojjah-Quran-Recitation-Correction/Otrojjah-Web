import React, { Component } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import RecordLabelTable from "./recordLabelTable";
import { getRecord } from "../../../services/recordsServices";
import _ from "lodash";

class RecordLabel extends Component {
  state = {
    record: {},
    labels: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidUpdate() {
    const { recordId } = this.props;
    const jwt = localStorage.getItem("token");
    const { data: record } = await getRecord(recordId, jwt);
    const labels = record[0].labeledBy;
    this.setState({ record, labels });
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { labels: data, currentPage, pageSize, sortColumn } = this.state;
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    const labels = paginate(sorted, currentPage, pageSize);
    return { totalCount: data.length, data: labels };
  };

  render() {
    const { pageSize, currentPage, sortColumn } = this.state;

    const { totalCount, data: labels } = this.getPagedData();
    return (
      <div>
        <RecordLabelTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          labels={labels}
        ></RecordLabelTable>
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
