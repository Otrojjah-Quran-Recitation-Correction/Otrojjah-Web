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
        <div className="py-5"></div>
        <main className="rule container my-5 py-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 text-center">
              {subRule.name && (
                <div>
                  <h3>الحكم:{subRule.name}</h3>
                  <h3>الحكم المفصل:{letter.name}</h3>
                  <h3>اية :﴿{verse.name}﴾</h3>
                  <h3>سورة :{verse.surah}</h3>
                </div>
              )}
              <p className="pt-3">استمع جيدا الى التسجيل الاتى.</p>
              <audio
                title={name}
                className="Audio"
                src={fileURL}
                controls
              ></audio>
              <p className="my-2">
                الان اضغط على
                {<FontAwesomeIcon className="mx-1" icon={faMicrophone} />} وابدء
                بالقراءة كما سمعت فى التسجيل ثم اضغط على
                {<FontAwesomeIcon className="mx-1" icon={faStopCircle} />} بعد
                انتهائك من التسجيل.
              </p>
              <Mic handleAlert={this.handleAlert} verseId={verseId}></Mic>
            </div>
            <div className="col-2"></div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
