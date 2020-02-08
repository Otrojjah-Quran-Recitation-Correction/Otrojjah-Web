import React, { Component } from "react";
import Table from "./common/Table";

class ClientsTable extends Component {
  columns = [
    {
      label: "record",
      content: item => (
        <audio controls>
          <source src={item.link} type="audio/wav" />
        </audio>
      )
    },
    { label: "recordName" },
    { label: "ayah" },
    { label: "hokm" },
    { label: "Delete" }
  ];

  render() {
    const { clients } = this.props;

    return <Table columns={this.columns} data={clients} />;
  }
}

export default ClientsTable;
