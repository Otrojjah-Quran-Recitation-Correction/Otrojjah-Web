import React, { Component } from "react";
import { getRandomRecord, labelRecord } from "../services/recordsServices";
import { getVerse } from "../services/versesServices";
import { getRule } from "../services/rulesServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

class Label extends Component {
  state = {
    record: {},
    jwt: "",
    labelAlert: "",
    verse: {},
    letter: {},
    subRule: {}
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data: record } = await getRandomRecord("client", jwt);
    this.setState({ jwt, record });
  }

  componentDidUpdate(prevProps, prevState) {
    const { verse, letter, subRule } = this.state;
    if (verse._id !== prevState.verse._id) {
      this.setState({ verse });
    }
    if (letter._id !== prevState.letter._id) {
      this.setState({ letter });
    }
    if (subRule._id !== prevState.subRule._id) {
      this.setState({ subRule });
    }
  }

  getVerse = async verseId => {
    const { data } = await getVerse(verseId);
    const verse = data[0];
    if (verse._id !== this.state.verse._id) this.setState({ verse });
  };

  getLetter = async ruleId => {
    const { data } = await getRule(ruleId);
    const letter = data[0];
    if (letter._id !== this.state.letter._id) this.setState({ letter });
  };

  getSubRule = async ruleId => {
    const { data } = await getRule(ruleId);
    const subRule = data[0];
    if (subRule._id !== this.state.subRule._id) this.setState({ subRule });
  };

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
    const { fileURL, name, verseId } = this.state.record;
    const { verse, letter, subRule } = this.state;
    if (verseId) this.getVerse(verseId);
    if (verse._id) this.getLetter(verse.ruleId);
    if (letter._id) this.getSubRule(letter.parentId);
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
                  <h3>الحكم:{subRule.name}</h3>
                  <h3>الحكم المفصل:{letter.name}</h3>
                  <h3>اية :{verse.name}</h3>
                  <h3>سورة :{verse.surah}</h3>
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
