import React from "react";
import Mic from "./mic";
import Joi from "joi-browser";
import Form from "./common/form";
import { getRules, getRule } from "../services/rulesServices";
import { getVerses } from "../services/versesServices";
import { getRecords } from "../services/recordsServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import Alert from "./common/alert";

class Rules extends Form {
  state = {
    records: [],
    data: {
      _id: "",
      label: "",
      name: "",
      fileURL: "",
      isShaikh: false
    },
    errors: {
      _id: "",
      label: "",
      name: "",
      fileURL: "",
      isShaikh: false
    },
    rule: "",
    subRules: [],
    letters: [],
    verses: [],
    shaikhName: "",
    subRuleKey: "",
    letterKey: "",
    verseKey: "",
    recordKey: "",
    noRecord: false,
    labelAlert: "",
    jwt: ""
  };

  schema = {
    shaikhName: Joi.string().required(),
    label: Joi.string().required()
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      const jwt = localStorage.getItem("token");
      const ruleId = this.props.match.params.id;
      let { data: rule } = await getRule(ruleId);
      const { data: subRules } = await getRules(ruleId);
      this.setState({ subRules, rule: rule[0], jwt });
    }
  }

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const ruleId = this.props.match.params.id;
    let { data: rule } = await getRule(ruleId);
    const { data: subRules } = await getRules(ruleId);
    this.setState({ subRules, rule: rule[0], jwt });
  }

  getLetters = async subRule => {
    const subRuleKey = subRule._id;
    const { data: letters } = await getRules(subRule._id);
    this.setState({ letters, subRule, subRuleKey });
  };

  getVerses = async letter => {
    const letterKey = letter._id;
    const { data: verses } = await getVerses(letter._id);
    this.setState({ verses, letter, letterKey });
  };

  getRecords = async verse => {
    const verseKey = verse._id;
    const shaikhName = "";
    const recordKey = "";
    let noRecord = false;
    const jwt = localStorage.getItem("token");
    const { data } = await getRecords(verse._id, jwt);
    const records = data.filter(e => e.isShaikh === true);
    data.label = "";
    if (!records[0]) noRecord = true;
    this.setState({
      records,
      verse,
      verseKey,
      shaikhName,
      data,
      noRecord,
      recordKey
    });
  };

  filterRecord = shaikhName => {
    const recordKey = shaikhName;
    const record = this.state.records.filter(
      e => e.label === shaikhName && e.isShaikh === true
    );
    const data = record[0];
    this.setState({ data, recordKey });
  };

  handleAlert = () => {
    const labelAlert = "success";
    this.setState({ labelAlert });
  };

  handleClose = () => {
    const labelAlert = "";
    this.setState({ labelAlert });
  };

  render() {
    const {
      rule,
      subRules,
      letters,
      verses,
      records,
      data,
      shaikhName,
      subRuleKey,
      letterKey,
      verseKey,
      recordKey,
      noRecord,
      labelAlert
    } = this.state;
    return (
      <React.Fragment>
        {labelAlert && (
          <Alert
            label={labelAlert}
            handleClose={this.handleClose}
            handleAccept={this.handleAccept}
          ></Alert>
        )}
        <div className="pb-5">
          <div className="container  pt-5 pb-2 rule">
            <div
              className="pt-5"
              style={{ display: "flex", flexWrap: "wrap", fontSize: "25px" }}
            >
              <span className="text_bg mb-1 pr-0 ">
                <span className="text_title"> أحكام</span>
                <span className="mr-3"> {rule.name}</span>
              </span>
            </div>
            <p>___________________________________</p>
            {rule.description && (
              <div>
                {rule.description.split("\n").map(line => (
                  <p>{line}</p>
                ))}
              </div>
            )}
            <div
              className="accordion pt-3 my-5 container "
              id="accordionExample"
            >
              <div>
                {subRules.map(subRule => (
                  <div key={subRule._id} className="card mainComponent my-2">
                    <div className="card-header" id={`hokm${subRule._id}`}>
                      <h2 className="mb-0">
                        <button
                          className="btn btn-link"
                          style={{ color: "#faeed6" }}
                          type="button"
                          data-toggle="collapse"
                          data-target={`#hokm1${subRule._id}`}
                          aria-expanded="true"
                          aria-controls={`hokm1${subRule._id}`}
                          onClick={() => this.getLetters(subRule)}
                        >
                          حكم {subRule.name}
                        </button>
                      </h2>
                    </div>

                    <div
                      id={`hokm1${subRule._id}`}
                      className="collapse"
                      aria-labelledby={`hokm${subRule._id}`}
                      data-parent="#accordionExample"
                    >
                      <div className="container mt-2 mr-2">
                        <h6>
                          تعرف اكثر عن حكم {subRule.name}
                          <a
                            data-toggle="collapse"
                            href={`#subRule${subRule._id}`}
                            style={{ color: "#c09048" }}
                            role="button"
                            aria-expanded="false"
                            aria-controls={`subRule${subRule._id}`}
                          >
                            &nbsp;من هنا
                          </a>
                          <div
                            className="collapse mt-2"
                            id={`subRule${subRule._id}`}
                          >
                            <div className="card mainComponent card-body">
                              {subRule.description && (
                                <div>
                                  {subRule.description.split("\n").map(line => (
                                    <p>{line}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </h6>{" "}
                      </div>
                      <div className="container row">
                        <div className="col-md-1"></div>
                        <div className="card-body text-center col-md-10">
                          <div>
                            <div
                              className="accordion pt-3 mb-5 container "
                              id={`hokm5${subRule._id}`}
                            >
                              {subRuleKey === subRule._id && (
                                <div>
                                  {letters.map(letter => (
                                    <div
                                      key={letter._id}
                                      className="card rule my-2"
                                      style={{ borderRadius: "20px" }}
                                    >
                                      <div
                                        className="card-header"
                                        id={`hokm${letter._id}`}
                                      >
                                        <h2 className="mb-0">
                                          <button
                                            className="btn btn-link"
                                            style={{ color: "#233a48" }}
                                            type="button"
                                            data-toggle="collapse"
                                            data-target={`#hokm1${letter._id}`}
                                            aria-expanded="true"
                                            aria-controls={`hokm1${letter._id}`}
                                            onClick={() =>
                                              this.getVerses(letter)
                                            }
                                          >
                                            حكم {letter.name}
                                          </button>
                                        </h2>
                                      </div>

                                      <div
                                        id={`hokm1${letter._id}`}
                                        className="collapse"
                                        aria-labelledby={`hokm${letter._id}`}
                                        data-parent={`#hokm5${subRule._id}`}
                                      >
                                        {/* <div className="container mt-2 mr-2">
                                          <h6>
                                            تعرف اكثر عن حكم {letter.name}
                                            <a
                                              data-toggle="collapse"
                                              href={`#letter${letter._id}`}
                                              role="button"
                                              aria-expanded="false"
                                              aria-controls={`letter${letter._id}`}
                                            >
                                              &nbsp;من هنا
                                            </a>
                                            <div
                                              className="collapse mt-2"
                                              id={`letter${letter._id}`}
                                            >
                                              <div className="card card-body">
                                                {letter.description && (
                                                  <div>
                                                    {letter.description
                                                      .split("\n")
                                                      .map(line => (
                                                        <p>{line}</p>
                                                      ))}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          </h6>{" "}
                                        </div> */}
                                        <div className="container row">
                                          <div className="col-md-2"></div>
                                          <div className="card-body text-center col-md-8">
                                            {letterKey === letter._id && (
                                              <div>
                                                <p>اختر الاية</p>
                                                {verses.map(verse => (
                                                  <div key={verse._id}>
                                                    <button
                                                      key={verse.name}
                                                      className=" m-2 ayah result_btn"
                                                      onClick={() =>
                                                        this.getRecords(verse)
                                                      }
                                                    >
                                                      {verse.name}
                                                    </button>
                                                    {noRecord &&
                                                      verseKey ===
                                                        verse._id && (
                                                        <div className="alert alert-danger">
                                                          لايوجد تسجيلات الان
                                                          لتلك الاية!
                                                        </div>
                                                      )}
                                                    {records[0] &&
                                                      verseKey ===
                                                        verse._id && (
                                                        <form
                                                          key={verse.surah}
                                                          className="mt-3"
                                                          style={{
                                                            border: "none"
                                                          }}
                                                        >
                                                          {this.renderSelect(
                                                            "label",
                                                            "اختر الشيخ",
                                                            records
                                                          )}
                                                        </form>
                                                      )}
                                                    {verseKey === verse._id &&
                                                      shaikhName && (
                                                        <button
                                                          key={
                                                            this.state
                                                              .shaikhName
                                                          }
                                                          className="result_btn my-2"
                                                          onClick={() =>
                                                            this.filterRecord(
                                                              this.state
                                                                .shaikhName
                                                            )
                                                          }
                                                        >
                                                          ابدء
                                                        </button>
                                                      )}
                                                    {verseKey === verse._id &&
                                                      shaikhName &&
                                                      shaikhName ===
                                                        recordKey && (
                                                        <div key={verse._id}>
                                                          <p className="py-5">
                                                            <span
                                                              style={{
                                                                fontSize:
                                                                  "15px",
                                                                paddingRight:
                                                                  "25px"
                                                              }}
                                                              className="text_bg"
                                                            >
                                                              استمع جيدا الى
                                                              التسجيل الاتى..
                                                            </span>
                                                          </p>
                                                          <audio
                                                            className="Audio"
                                                            src={data.fileURL}
                                                            controls
                                                          ></audio>
                                                          <p className="my-2">
                                                            الان اضغط على
                                                            {
                                                              <FontAwesomeIcon
                                                                className="mx-1"
                                                                icon={
                                                                  faMicrophone
                                                                }
                                                              />
                                                            }{" "}
                                                            وابدء بالقراءة كما
                                                            سمعت فى التسجيل ثم
                                                            اضغط على
                                                            {
                                                              <FontAwesomeIcon
                                                                className="mx-1"
                                                                icon={
                                                                  faStopCircle
                                                                }
                                                              />
                                                            }{" "}
                                                            بعد انتهائك من
                                                            التسجيل ثم اضغط على{" "}
                                                            تقييم
                                                          </p>

                                                          <Mic
                                                            className="mt-2"
                                                            handleAlert={
                                                              this.handleAlert
                                                            }
                                                            verseId={verse._id}
                                                          ></Mic>
                                                        </div>
                                                      )}
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                          <div className="col-md-2"></div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-1"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Rules;
