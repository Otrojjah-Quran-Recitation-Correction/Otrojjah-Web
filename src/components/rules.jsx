import React from "react";
import Mic from "./mic";
import Joi from "joi-browser";
import Form from "./common/form";
import { getRules } from "../services/rulesServices";
import { getVerses } from "../services/versesServices";
import { getRecords } from "../services/recordsServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";

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
    subRules: [],
    letters: [],
    verses: [],
    shaikhName: "",
    subRuleKey: "",
    letterKey: "",
    verseKey: "",
    recordKey: ""
  };

  schema = {
    shaikhName: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required(),
    link: Joi.string(),
    label: Joi.string()
  };

  async componentDidMount() {
    const ruleId = this.props.match.params.id;
    const { data: subRules } = await getRules(ruleId);
    this.setState({ subRules });
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
    const jwt = localStorage.getItem("token");
    const { data } = await getRecords(verse._id, jwt);
    const records = data.filter(e => e.isShaikh === true);
    this.setState({ records, verse, verseKey, shaikhName });
  };

  filterRecord = shaikhName => {
    const recordKey = shaikhName;
    const record = this.state.records.filter(
      e => e.label === shaikhName && e.isShaikh === true
    );
    const data = record[0];
    this.setState({ data, recordKey });
  };

  render() {
    const {
      subRules,
      letters,
      verses,
      records,
      data,
      shaikhName,
      subRuleKey,
      letterKey,
      verseKey,
      recordKey
    } = this.state;
    return (
      <React.Fragment>
        <div className="pt-5">
          <div className="accordion pt-3 my-5 container " id="accordionExample">
            <div>
              {subRules.map(subRule => (
                <div key={subRule._id} className="card mainComponent my-2">
                  <div className="card-header" id={`hokm${subRule._id}`}>
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link"
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
                      <p>
                        تعرف اكثر عن حكم {subRule.name}
                        <a
                          data-toggle="collapse"
                          href={`#subRule${subRule._id}`}
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
                          <div className="card card-body">
                            {subRule.description}
                          </div>
                        </div>
                      </p>{" "}
                    </div>
                    <div className="container row">
                      <div className="col-2"></div>
                      <div className="card-body text-center col-8">
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
                                    className="card mainComponent my-2"
                                  >
                                    <div
                                      className="card-header"
                                      id={`hokm${letter._id}`}
                                    >
                                      <h2 className="mb-0">
                                        <button
                                          className="btn btn-link"
                                          type="button"
                                          data-toggle="collapse"
                                          data-target={`#hokm1${letter._id}`}
                                          aria-expanded="true"
                                          aria-controls={`hokm1${letter._id}`}
                                          onClick={() => this.getVerses(letter)}
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
                                      <div className="container mt-2 mr-2">
                                        <p>
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
                                              {letter.description}
                                            </div>
                                          </div>
                                        </p>{" "}
                                      </div>
                                      <div className="container row">
                                        <div className="col-2"></div>
                                        <div className="card-body text-center col-8">
                                          {letterKey === letter._id && (
                                            <div>
                                              {verses.map(verse => (
                                                <div key={verse._id}>
                                                  <button
                                                    key={verse.name}
                                                    className="btn btn-info  m-2 aya"
                                                    onClick={() =>
                                                      this.getRecords(verse)
                                                    }
                                                  >
                                                    {verse.name}
                                                  </button>

                                                  {verseKey === verse._id && (
                                                    <form
                                                      key={verse.surah}
                                                      className="mt-3"
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
                                                          this.state.shaikhName
                                                        }
                                                        className="btn btn-dark my-2"
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
                                                        <p>
                                                          استمع جيدا الى التسجيل
                                                          الاتى.
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
                                                          التسجيل.
                                                        </p>
                                                        <Mic
                                                          className="mt-2"
                                                          verseId={verse._id}
                                                        ></Mic>
                                                      </div>
                                                    )}
                                                </div>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                        <div className="col-2"></div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Rules;
