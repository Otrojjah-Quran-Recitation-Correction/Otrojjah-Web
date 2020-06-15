import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import SearchBox from "../../common/searchBox";
import RecordTable from "./recordTable";
import {
  getRecords,
  // updateRecord,
  deleteGSCRecord,
  deleteGSCRecords
} from "../../../services/recordsServices";
import _ from "lodash";

class Record extends Component {
  state = {
    records: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidUpdate(prevProps, prevState) {
    const { verseId, view } = this.props;
    const jwt = localStorage.getItem("token");
    if (prevProps.view !== this.props.view) {
      const currentPage = 1;
      let records = [];
      this.setState({ records });
      let { data } = await getRecords(verseId, jwt);
      records = data;
      if (view === "shaikh") records = records.filter(e => e.isShaikh === true);
      else if (view === "labeled")
        records = records.filter(e => e.labeledBy[0] && e.isShaikh === false);
      else if (view === "unLabeled")
        records = records.filter(e => !e.labeledBy[0] && e.isShaikh === false);

      // if (records[0] && records[0].isShaikh) {
      //   for (let i = 0; i < records.length; i++) {
      //     let record = {};
      //     if (records[i].name === "Abdul-Basit-Mujawwad-128kbps.wav") {
      //       record = {
      //         label: "عبد الباسط مجود",
      //         verseId: records[i].verseId
      //       };
      //       await updateRecord(record, records[i]._id, jwt);
      //     } else if (records[i].name === "Abdul-Basit-Murattal-192kbps.wav") {
      //       record = { label: "عبد الباسط", verseId: records[i].verseId };
      //       await updateRecord(record, records[i]._id, jwt);
      //     } else if (records[i].name === "Alafasy-128kbps.wav") {
      //       record = { label: "مشارى", verseId: records[i].verseId };
      //       await updateRecord(record, records[i]._id, jwt);
      //     } else if (records[i].name === "Husary-128kbps.wav") {
      //       record = { label: "الحصري", verseId: records[i].verseId };
      //       await updateRecord(record, records[i]._id, jwt);
      //     } else if (records[i].name === "Husary-Mujawwad-128kbps.wav") {
      //       record = {
      //         label: "الحصري مجود",
      //         verseId: records[i].verseId
      //       };
      //       await updateRecord(record, records[i]._id, jwt);
      //     } else if (records[i].name === "Mahmoud-Ali-Al-Banna-32kbps.wav") {
      //       record = {
      //         label: "محمود البنا",
      //         verseId: records[i].verseId
      //       };
      //       await updateRecord(record, records[i]._id, jwt);
      //     } else if (records[i].name === "Menshawi-16kbps.wav") {
      //       record = { label: "المنشاوى", verseId: records[i].verseId };
      //       await updateRecord(record, records[i]._id, jwt);
      //     } else if (records[i].name === "Minshawy-Mujawwad-192kbps.wav") {
      //       record = {
      //         label: "المنشاوى مجود",
      //         verseId: records[i].verseId
      //       };
      //       await updateRecord(record, records[i]._id, jwt);
      //     }
      //   }
      // }
      this.setState({ records, currentPage });
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handlePageChange = (page, type = "", pagesCount) => {
    if (type === "prev" && page !== 1) this.setState({ currentPage: page - 1 });
    else if (type === "next" && page < pagesCount)
      this.setState({ currentPage: page + 1 });
    else this.setState({ currentPage: page });
  };

  handleDelete = async record => {
    const jwt = this.props.jwt;
    await deleteGSCRecord(record, jwt);
    window.location = `/showRecords/${this.props.verseId}`;
  };

  handleDeleteAll = async isShaikh => {
    const jwt = this.props.jwt;
    await deleteGSCRecords(this.props.verseId, isShaikh, jwt);
    window.location = `/showRecords/${this.props.verseId}`;
  };

  getPagedData = () => {
    const {
      records: data,
      currentPage,
      pageSize,
      searchQuery,
      sortColumn
    } = this.state;
    let filtered = data;
    if (searchQuery)
      filtered = data.filter(m =>
        m.label.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const records = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: records };
  };

  render() {
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;
    const { totalCount, data: records } = this.getPagedData();
    if (this.props.deleteRecord === "one") this.handleDelete(this.props.record);
    if (this.props.deleteRecord === "shaikh") this.handleDeleteAll(true);
    if (this.props.deleteRecord === "client") this.handleDeleteAll(false);

    return (
      <div>
        {this.props.view === "shaikh" && (
          <div>
            <Link to={`/addRecord/${this.props.verseId}`}>
              <button className="my-2 action_btn">Add Record</button>
            </Link>
            <button
              className="action_btn mx-2"
              onClick={() => this.props.handleAlert("shaikh")}
            >
              Delete All
            </button>
          </div>
        )}

        {this.props.view === "unLabeled" && (
          <div>
            <Link to={`/addClientRecord/${this.props.verseId}`}>
              <button className="my-2 action_btn">Add Record</button>
            </Link>
            {/* <button
              className="btn btn-danger mx-2"
              onClick={() => this.props.handleAlert("client")}
            >
              Delete All
            </button> */}
          </div>
        )}
        {this.props.view && (
          <div>
            <p>Showing {totalCount} record in the database</p>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        )}
        <RecordTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          view={this.props.view}
          records={records}
          handleAlert={this.props.handleAlert}
        ></RecordTable>
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
