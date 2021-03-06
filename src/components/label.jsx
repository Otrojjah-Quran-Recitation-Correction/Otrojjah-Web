import React, { Component } from "react";
import { getRandomRecord, labelRecord } from "../services/recordsServices";
import { getVerse } from "../services/versesServices";
import { getRule } from "../services/rulesServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import Alert from "./common/alert";

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

  handleAccept = async label => {
    const record = { ...this.state.record };
    const jwt = localStorage.getItem("token");
    const recordLabel = { label: label };
    const err = await labelRecord(recordLabel, record._id, jwt);
    if (!err) {
      window.location = "/label";
    }
  };

  render() {
    const { fileURL, name, verseId } = this.state.record;
    const { verse, letter, subRule, labelAlert } = this.state;
    if (verseId) this.getVerse(verseId);
    if (verse._id) this.getLetter(verse.ruleId);
    if (letter._id) this.getSubRule(letter.parentId);
    return (
      <React.Fragment>
        {labelAlert && (
          <Alert
            label={labelAlert}
            handleClose={this.handleClose}
            handleAccept={this.handleAccept}
          ></Alert>
        )}
        <div className="container rule pt-5">
          {this.state.record.fileURL && (
            <div className="pt-5">
              {subRule.name && (
                <div
                  className="m-auto text-center"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center"
                  }}
                >
                  <span className="text_bg mb-1 pr-0 mx-3">
                    <span className="text_title"> الآية</span>
                    <span className="ayah mr-3">{verse.name}</span>
                  </span>

                  <span className="text_bg mb-1 pr-0 mx-3">
                    <span className="text_title"> السورة</span>{" "}
                    <span className="mr-3"> {verse.surah}</span>
                  </span>

                  <span className="text_bg mb-1 pr-0 mx-3">
                    <span className="text_title"> الحكم</span>
                    <span className="mr-3"> {subRule.name}</span>
                  </span>

                  <span className="text_bg mb-1 pr-0 mx-3">
                    <span className="text_title"> الحكم المفصل</span>
                    <span className="mr-3"> {letter.name}</span>
                  </span>
                </div>
              )}

              <div className="row pt-5">
                <div className="col-2"></div>
                <div className="col-8 ">
                  <audio
                    title={name}
                    className="Audio mt-3"
                    controls
                    style={{ display: "block" }}
                    src={fileURL}
                  ></audio>
                  <div className="container my-5">
                    <div className="row">
                      <FontAwesomeIcon
                        className="labelicon ml-1 result_btn col"
                        onClick={() => this.handleAlert("true")}
                        icon={faCheck}
                      />

                      <FontAwesomeIcon
                        className="labelicon mr-1 result_btn col"
                        onClick={() => this.handleAlert("false")}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-3"></div>
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Label;
