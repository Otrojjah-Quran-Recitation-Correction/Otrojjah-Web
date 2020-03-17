import React, { Component } from "react";
import Table from "./common/table";
import { getRecord } from "../services/recordsServices";

class RecordLabelTable extends Component {
  state = {
    name: "",
    l: []
  };

  async componentDidUpdate(prevProps, prevState) {
    const { labels } = this.props;
    let l = [];
    const jwt = localStorage.getItem("token");
    for (let i = 0; i < labels.length; i++) {
      const { data } = await getRecord(labels[i].shaikhId, jwt);
      l.push(data[0]);
      this.setState({ l });
    }
    if (prevState.l !== this.state.l) {
      console.log(l[0]["name"]);
      this.setState({ l });
    }
  }
  columns = [
    {
      label: "shaikName",
      content: item => (
        <div>{this.state.l[0] && <p>{this.state.l[0].name}</p>}</div>
      )
    },
    {
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
    const { labels } = this.props;
    return (
      <div>
        <Table columns={this.columns} data={labels} />
      </div>
    );
  }
}

export default RecordLabelTable;
