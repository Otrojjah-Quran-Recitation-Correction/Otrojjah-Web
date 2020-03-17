import React, { Component } from "react";
import RecordLabel from "./recordLabel";

class ShowRecordLabel extends Component {
  state = { jwt: "", recordId: "" };

  async componentDidMount() {
    const recordId = this.props.match.params.id;
    const jwt = localStorage.getItem("token");
    this.setState({ jwt, recordId });
  }

  render() {
    const { jwt, recordId } = this.state;
    return (
      <div className="py-5">
        <div className="mainComponent container my-5 py-5">
          <RecordLabel jwt={jwt} recordId={recordId}></RecordLabel>
        </div>
      </div>
    );
  }
}

export default ShowRecordLabel;
