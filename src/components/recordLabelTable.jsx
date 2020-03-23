import React, { Component } from "react";
import Table from "./common/table";
import { getUser } from "../services/usersServices";

class RecordLabelTable extends Component {
  state = {
    shaikhLabels: []
  };

  async componentDidUpdate(prevProps, prevState) {
    const { labels } = this.props;
    const jwt = localStorage.getItem("token");
    if (prevProps.labels[0]) {
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
  }

  columns = [
    {
      label: "shaikName",
      content: item => <p>{item.name}</p>
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
    const { shaikhLabels } = this.state;
    return (
      <div>
        <Table columns={this.columns} data={shaikhLabels} />
      </div>
    );
  }
}

export default RecordLabelTable;
