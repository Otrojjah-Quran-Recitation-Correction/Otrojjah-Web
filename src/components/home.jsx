import React, { Component } from "react";
import Mic from "./mic";
import { getRandomRecord } from "../services/recordsServices";
import { getVerse } from "../services/versesServices";
import { getRule } from "../services/rulesServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import Alert from "./common/alert";

class Home extends Component {
  state = {
    record: {},
    jwt: "",
    verse: {},
    letter: {},
    subRule: {},
    labelAlert: ""
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data: record } = await getRandomRecord("shaikh", jwt);
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

  handleAlert = () => {
    const labelAlert = "success";
    this.setState({ labelAlert });
  };

  handleClose = () => {
    const labelAlert = "";
    this.setState({ labelAlert });
    window.location = "/";
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
        <main className="container rule mb-5 py-5">
          <div className="row mb-5 pt-5">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <p>
                <span className="text_bg" style={{ paddingRight: "25px" }}>
                  استمع جيدا الى التسجيل الاتى..
                </span>
              </p>
              <audio
                title={name}
                className="Audio mt-5"
                src={fileURL}
                controls
              ></audio>
            </div>
            <div className="col-md-2"></div>
          </div>
          {subRule.name && (
            <div
              className="m-auto text-center"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center"
              }}
            >
              <span className="text_bg mb-1  mx-3">
                <span className="text_title"> الآية</span>
                <span className="ayah mr-3">{verse.name}</span>
              </span>

              <span className="text_bg mb-1 mx-3">
                <span className="text_title"> السورة</span>{" "}
                <span className="mr-3"> {verse.surah}</span>
              </span>

              <span className="text_bg mb-1 mx-3">
                <span className="text_title"> الحكم</span>
                <span className="mr-3"> {subRule.name}</span>
              </span>

              <span className="text_bg mb-1 mx-3">
                <span className="text_title"> الحكم المفصل</span>
                <span className="mr-3"> {letter.name}</span>
              </span>
            </div>
          )}
          <div className="row my-5">
            <div className="col-md-2"></div>
            <div className="col-md-8 text-center">
              <p className="my-2">
                الان اضغط على
                {<FontAwesomeIcon className="mx-1" icon={faMicrophone} />} وابدء
                بالقراءة كما سمعت فى التسجيل
                <br /> ثم اضغط على
                {<FontAwesomeIcon className="mx-1" icon={faStopCircle} />} بعد
                انتهائك من التسجيل ثم اضغط على تقييم
              </p>
              <Mic handleAlert={this.handleAlert} verseId={verseId}></Mic>
            </div>
            <div className="col-md-2"></div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
