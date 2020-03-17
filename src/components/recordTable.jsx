import React, { Component } from "react";
import Table from "./common/table";

class RecordTable extends Component {
  labeled = [
    {
      label: "record",
      content: item => <audio controls src={item.filePath}></audio>
    },
    {
      label: "name"
    },
    {
      label: "labeledBy",
      content: item => <a href={`/showRecordLabel/${item._id}`}> LabeledBy</a>
    }
  ];

  unLabeled = [
    {
      label: "record",
      content: item => <audio controls src={item.filePath}></audio>
    },
    {
      label: "name"
    }
  ];
  shaikh = [
    {
      label: "record",
      content: item => <audio controls src={item.filePath}></audio>
    },
    { label: "ShaikhName", content: item => <p>{item.label}</p> }
  ];

  render() {
    const { records, view } = this.props;
    return (
      <div>
        {view === "labeled" && <Table columns={this.labeled} data={records} />}
        {view === "unLabeled" && (
          <Table columns={this.unLabeled} data={records} />
        )}
        {view === "shaikh" && <Table columns={this.shaikh} data={records} />}
      </div>
    );
  }
}

export default RecordTable;
