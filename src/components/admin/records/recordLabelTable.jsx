import React, { Component } from "react";
import Table from "../../common/table";
import { getUser } from "../../../services/usersServices";

class RecordLabelTable extends Component {
  state = {
    shaikhLabels: []
  };

  getShaikhNames = async () => {
    if (!this.state.shaikhLabels[0]) {
      const { labels } = this.props;
      const jwt = localStorage.getItem("token");
      let shaikhLabels = [];
      for (let i = 0; i < labels.length; i++) {
        const { data } = await getUser(labels[i].shaikhId, jwt);
        let temp = {};
        temp._id = labels[i]._id;
        temp.name = data.name;
        temp.label = labels[i].label;
        shaikhLabels.push(temp);
      }
      this.setState({ shaikhLabels });
    }
  };

  columns = [
    {
      paht: "name",
      label: "shaikName",
      content: item => <p>{item.name}</p>
    },
    {
      path: "label",
      label: "label",
      content: item => (
        <div>
          {item.label === true && <p>true</p>}
          {item.label === false && <p>false</p>}
        </div>
      )
    }
  ];

  render() {
    const { shaikhLabels } = this.state;
    const { onSort, sortColumn } = this.props;
    if (this.props.labels[0]) this.getShaikhNames();
    return (
      <div>
        <Table
          sortColumn={sortColumn}
          onSort={onSort}
          columns={this.columns}
          data={shaikhLabels}
        />
      </div>
    );
  }
}

export default RecordLabelTable;
