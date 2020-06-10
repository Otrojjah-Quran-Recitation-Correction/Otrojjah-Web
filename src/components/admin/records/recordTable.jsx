import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "../../common/table";

class RecordTable extends Component {
  labeled = [
    {
      key: "record",
      label: "record",
      content: item => (
        <audio title={item.name} controls src={item.fileURL}></audio>
      )
    },
    {
      path: "name",
      label: "name"
    },
    {
      key: "labelBy",
      label: "labeledBy",
      content: item => (
        <Link style={{ color: "#bf8e4b" }} to={`/showRecordLabel/${item._id}`}>
          {" "}
          LabeledBy
        </Link>
      )
    },
    {
      key: "delete",
      label: "delete",
      content: item => (
        <button
          className="action_btn"
          onClick={() => this.props.handleAlert(item)}
        >
          Delete
        </button>
      )
    }
  ];

  unLabeled = [
    {
      key: "record",
      label: "record",
      content: item => (
        <audio title={item.name} controls src={item.fileURL}></audio>
      )
    },
    {
      path: "label",
      label: "label"
    },
    {
      key: "delete",
      label: "delete",
      content: item => (
        <button
          className="action_btn"
          onClick={() => this.props.handleAlert(item)}
        >
          Delete
        </button>
      )
    }
  ];
  shaikh = [
    {
      key: "record",
      label: "record",
      content: item => (
        <audio title={item.name} controls src={item.fileURL}></audio>
      )
    },
    {
      path: "label",
      label: "ShaikhName",
      content: item => <p>{item.label}</p>
    },
    {
      key: "edit",
      label: "edit",
      content: item => (
        <Link to={`/editRecord/${item._id}`}>
          <button className="action_btn">Edit</button>
        </Link>
      )
    },
    {
      key: "delete",
      label: "delete",
      content: item => (
        <button
          className="action_btn"
          onClick={() => this.props.handleAlert(item)}
        >
          Delete
        </button>
      )
    }
  ];

  render() {
    const { records, view, onSort, sortColumn } = this.props;
    return (
      <div>
        {view === "labeled" && (
          <Table
            sortColumn={sortColumn}
            onSort={onSort}
            columns={this.labeled}
            data={records}
          />
        )}
        {view === "unLabeled" && (
          <Table
            sortColumn={sortColumn}
            onSort={onSort}
            columns={this.unLabeled}
            data={records}
          />
        )}
        {view === "shaikh" && (
          <Table
            sortColumn={sortColumn}
            onSort={onSort}
            columns={this.shaikh}
            data={records}
          />
        )}
      </div>
    );
  }
}

export default RecordTable;
