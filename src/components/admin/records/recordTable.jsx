import React, { Component } from "react";
import Table from "../../common/table";

class RecordTable extends Component {
  labeled = [
    {
      key: "record",
      label: "record",
      content: item => <audio controls src={item.fileURL}></audio>
    },
    {
      path: "name",
      label: "name"
    },
    {
      key: "labelBy",
      label: "labeledBy",
      content: item => <a href={`/showRecordLabel/${item._id}`}> LabeledBy</a>
    }
  ];

  unLabeled = [
    {
      key: "record",
      label: "record",
      content: item => <audio controls src={item.fileURL}></audio>
    },
    {
      path: "name",
      label: "name"
    }
  ];
  shaikh = [
    {
      key: "record",
      label: "record",
      content: item => <audio controls src={item.fileURL}></audio>
    },
    { path: "label", label: "ShaikhName", content: item => <p>{item.label}</p> }
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
