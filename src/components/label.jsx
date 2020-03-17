import React, { Component } from "react";
import { getRecords, labelRecord } from "../services/recordsServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

class Label extends Component {
  state = {
    records: [],
    record: {},
    jwt: ""
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data: records } = await getRecords("", jwt);
    const randomNum = Math.floor(Math.random() * records.length);
    const record = records[randomNum];
    this.setState({ jwt, records, record });
  }

  handleLabel = async label => {
    const record = { ...this.state.record };
    const jwt = localStorage.getItem("token");
    const recordLabel = { label: label };
    const err = await labelRecord(recordLabel, record._id, jwt);
    if (!err) {
      window.location = "/label";
    }
  };

  render() {
    const { filePath, name } = this.state.record;
    return (
      <React.Fragment>
        <div className="container my-5 pt-5">
          {this.state.record.filePath && (
            <div className="row  pt-5">
              <div className="col"></div>
              <div className="col label">
                <div className="text-center mb-5">
                  <h5>الحكم:</h5>
                  <h5>الاية:</h5>
                </div>
                <audio
                  title={name}
                  className="Audio mt-3"
                  controls
                  style={{ display: "block" }}
                  src={filePath}
                ></audio>
                <div className="container my-2">
                  <div className="row">
                    <FontAwesomeIcon
                      className="labelicon ml-1 btn btn-success col"
                      onClick={() => this.handleLabel("true")}
                      icon={faCheck}
                    />

                    <FontAwesomeIcon
                      className="labelicon mr-1 btn btn-danger col"
                      onClick={() => this.handleLabel("false")}
                      icon={faTimes}
                    />
                  </div>
                </div>
              </div>
              <div className="col"></div>
            </div>
          )}
          {!this.state.record.filePath && (
            <h1 className="text-center py-5">
              لا يوجد تسجيلات الان ليتم تقييمها!
            </h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Label;
