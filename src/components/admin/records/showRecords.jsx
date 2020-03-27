import React, { Component } from "react";
import Record from "./record";

class ShowRecords extends Component {
  state = { jwt: "", verseId: "", view: "" };

  async componentDidMount() {
    const verseId = this.props.match.params.id;
    const jwt = localStorage.getItem("token");
    this.setState({ jwt, verseId });
  }

  showLabeledRecords = () => {
    const view = "labeled";
    this.setState({ view });
  };

  showUnLabeledRecords = () => {
    const view = "unLabeled";
    this.setState({ view });
  };

  showShaikhRecords = () => {
    const view = "shaikh";
    this.setState({ view });
  };

  render() {
    const { jwt, verseId, view } = this.state;
    return (
      <div className="py-5">
        <div className="mainComponent container my-5 py-5">
          <div className="container">
            <div className="row">
              <button
                onClick={this.showShaikhRecords}
                className="col btn btn-primary m-2"
              >
                Shaikh Records
              </button>
              <button
                onClick={this.showLabeledRecords}
                className="col btn btn-primary m-2"
              >
                Labeled Records
              </button>
              <button
                onClick={this.showUnLabeledRecords}
                className="col btn btn-primary m-2"
              >
                UnLabeled Records
              </button>
            </div>
          </div>

          <Record jwt={jwt} view={view} verseId={verseId}></Record>
        </div>
      </div>
    );
  }
}

export default ShowRecords;
