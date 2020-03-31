import React, { Component } from "react";
import Record from "./record";
import Alert from "../../common/alert";

class ShowRecords extends Component {
  state = {
    jwt: "",
    verseId: "",
    view: "",
    labelAlert: "",
    deleteRecord: ""
  };

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

  handleAlert = record => {
    let labelAlert = "";
    labelAlert = record;
    this.setState({ labelAlert });
  };

  handleRecordDelete = async () => {
    let deleteRecord = "";
    if (this.state.labelAlert === "shaikh") deleteRecord = "shaikh";
    else if (this.state.labelAlert === "client") deleteRecord = "client";
    else deleteRecord = "one";
    this.setState({ deleteRecord });
  };

  handleClose = () => {
    const labelAlert = "";
    this.setState({ labelAlert });
  };

  render() {
    const { jwt, verseId, view, labelAlert, deleteRecord } = this.state;
    return (
      <React.Fragment>
        {labelAlert && (
          <Alert
            label={labelAlert}
            handleClose={this.handleClose}
            handleAccept={this.handleRecordDelete}
          ></Alert>
        )}
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

            <Record
              deleteRecord={deleteRecord}
              record={labelAlert}
              handleAlert={this.handleAlert}
              jwt={jwt}
              view={view}
              verseId={verseId}
            ></Record>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowRecords;
