import React, { Component } from "react";
import { getRandomRecord, labelRecord } from "../services/recordsServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

class Label extends Component {
  state = {
    record: {},
    jwt: "",
    labelAlert: ""
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data: record } = await getRandomRecord("client", jwt);
    this.setState({ jwt, record });
  }

  handleAlert = label => {
    const labelAlert = label;
    this.setState({ labelAlert });
  };

  handleClose = () => {
    const labelAlert = "";
    this.setState({ labelAlert });
  };

  handleLabel = async label => {
    const record = { ...this.state.record };
    console.log(label);
    const jwt = localStorage.getItem("token");
    const recordLabel = { label: label };
    const err = await labelRecord(recordLabel, record._id, jwt);
    if (!err) {
      window.location = "/label";
    }
  };

  render() {
    const { fileURL, name } = this.state.record;
    return (
      <React.Fragment>
        {this.state.labelAlert && (
          <div
            aria-live="polite"
            aria-atomic="true"
            className="d-flex justify-content-center align-items-center labelhead"
            style={{ minHeight: 200 + "px" }}
          >
            <div
              className="toast labelalert"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className="toast-header">
                <button
                  type="button"
                  className="ml-2 mb-1 close"
                  data-dismiss="toast"
                  aria-label="Close"
                  onClick={() => this.handleClose()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <h6 className="m-auto">هل انت متأكد من هذا الأختيار؟</h6>
              </div>
              <div className="toast-body">
                <button
                  style={{ width: 50 + "px" }}
                  className="mx-1 btn btn-success"
                  onClick={() => this.handleLabel(this.state.labelAlert)}
                >
                  نعم
                </button>
                <button
                  style={{ width: 50 + "px" }}
                  className="mx-1 btn btn-danger"
                  onClick={() => this.handleClose()}
                >
                  لا
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="container  pt-5">
          {this.state.record.fileURL && (
            <div className="row pt-5">
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
                  src={fileURL}
                ></audio>
                <div className="container my-2">
                  <div className="row">
                    <FontAwesomeIcon
                      className="labelicon ml-1 btn btn-success col"
                      onClick={() => this.handleAlert("true")}
                      icon={faCheck}
                    />

                    <FontAwesomeIcon
                      className="labelicon mr-1 btn btn-danger col"
                      onClick={() => this.handleAlert("false")}
                      icon={faTimes}
                    />
                  </div>
                </div>
              </div>
              <div className="col"></div>
            </div>
          )}
          {!this.state.record.fileURL && (
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
