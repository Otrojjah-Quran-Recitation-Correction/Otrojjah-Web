import React, { Component } from "react";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import SearchBox from "./common/searchBox";
import RecordTable from "./recordTable";
import { getRecords } from "../services/recordsServices";

class Record extends Component {
  state = {
    records: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: ""
  };

  async componentDidUpdate(prevProps, prevState) {
    const { verseId, view } = this.props;
    const jwt = localStorage.getItem("token");
    if (prevProps.view !== this.props.view) {
      let records = [];
      this.setState({ records });
      let { data } = await getRecords(verseId, jwt);
      records = data;
      if (view === "shaikh") records = records.filter(e => e.isShaikh === true);
      else if (view === "labeled")
        records = records.filter(e => e.labeledBy[0] && e.isShaikh === false);
      else
        records = records.filter(e => !e.labeledBy[0] && e.isShaikh === false);
      this.setState({ records });
    }
  }

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handlePageChange = (page, type = "", pagesCount) => {
    if (type === "prev" && page !== 1) this.setState({ currentPage: page - 1 });
    else if (type === "next" && page < pagesCount)
      this.setState({ currentPage: page + 1 });
    else this.setState({ currentPage: page });
  };

  getPagedData = () => {
    const { records: data, currentPage, pageSize, searchQuery } = this.state;
    let filtered = data;
    if (searchQuery)
      filtered = data.filter(m =>
        m.label.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    const records = paginate(filtered, currentPage, pageSize);
    return { totalCount: filtered.length, data: records };
  };

  render() {
    const { pageSize, currentPage, searchQuery } = this.state;

    const { totalCount, data: records } = this.getPagedData();
    return (
      <div>
        {this.props.view && (
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
        )}
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
