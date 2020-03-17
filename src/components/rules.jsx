import React from "react";
import { Link } from "react-router-dom";
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
      filePath: "",
      isShaikh: false
    },
    errors: {
      _id: "",
      label: "",
      name: "",
      filePath: "",
      isShaikh: false
    },
    subRules: [],
    subRule: {},
    letters: [],
    lettert: {},
    verses: [],
    verse: {},
    shaikhName: ""
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
    const { data: letters } = await getRules(subRule._id);
    this.setState({ letters, subRule });
  };

  getVerses = async letter => {
    const { data: verses } = await getVerses(letter._id);
    this.setState({ verses, letter });
  };

  getRecords = async verse => {
    const jwt = localStorage.getItem("token");
    const { data } = await getRecords(verse._id, jwt);
    const records = data.filter(e => e.isShaikh === true);
    this.setState({ records, verse });
  };

  filterRecord = shaikhName => {
    const record = this.state.records.filter(
      e => e.label === shaikhName && e.isShaikh === true
    );
    const data = record[0];
    console.log(data);
    this.setState({ data });
  };

  render() {
    const { subRules, letters, verses, records, data } = this.state;
    return (
      <React.Fragment>
        <div className="pt-5">
          <div className="accordion pt-3 my-5 container " id="accordionExample">
            <div>
              {subRules.map(subRule => (
                <div key={subRule.name} className="card mainComponent my-2">
                  <div className="card-header" id={`hokm${subRule.name}`}>
                    <h2 className="mb-0">
                      <button
                        className="btn btn-link"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#${subRule.name}`}
                        aria-expanded="true"
                        aria-controls={subRule.name}
                        onClick={() => this.getLetters(subRule)}
                      >
                        حكم {subRule.name}
                      </button>
                    </h2>
                  </div>

                  <div
                    id={subRule.name}
                    className="collapse"
                    aria-labelledby={`hokm${subRule.name}`}
                    data-parent="#accordionExample"
                  >
                    <div className="container mt-2 mr-2">
                      <p>
                        تعرف اكثر عن حكم {subRule.name}
                        <Link to={`/احكام/${subRule.name}`}> من هنا</Link>
                      </p>{" "}
                    </div>
                    <div className="container row">
                      <div className="col-2"></div>
                      <div className="card-body text-center col-8">
                        {this.state.subRule && (
                          <div>
                            <div
                              className="accordion pt-3 my-5 container "
                              id="accordionExample1"
                            >
                              {letters[0] &&
                                this.state.subRule._id ===
                                  letters[0].parentId && (
                                  <div>
                                    {letters.map(letter => (
                                      <div>
                                        {this.state.subRule._id ===
                                          letter.parentId && (
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
                                              data-parent="#accordionExample1"
                                            >
                                              <div className="container mt-2 mr-2">
                                                <p>
                                                  تعرف اكثر عن حكم {letter.name}
                                                  <Link
                                                    to={`/احكام/${letter.name}`}
                                                  >
                                                    {" "}
                                                    من هنا
                                                  </Link>
                                                </p>{" "}
                                              </div>
                                              <div className="container row">
                                                <div className="col-2"></div>
                                                <div className="card-body text-center col-8">
                                                  {this.state.letter &&
                                                    this.state.letter._id ===
                                                      verses[0].ruleId && (
                                                      <div>
                                                        {verses.map(verse => (
                                                          <div key={verse._id}>
                                                            <button
                                                              key={verse.name}
                                                              className="btn btn-info  m-2 aya"
                                                              onClick={() =>
                                                                this.getRecords(
                                                                  verse
                                                                )
                                                              }
                                                            >
                                                              {verse.name}
                                                            </button>

                                                            {records[0] &&
                                                              records[0]
                                                                .verseId ===
                                                                verse._id && (
                                                                <form
                                                                  key={
                                                                    verse.surah
                                                                  }
                                                                  className="mt-3"
                                                                >
                                                                  {this.renderSelect(
                                                                    "label",
                                                                    "اختر الشيخ",
                                                                    records
                                                                  )}
                                                                </form>
                                                              )}
                                                            {this.state
                                                              .shaikhName &&
                                                              records[0]
                                                                .verseId ===
                                                                verse._id && (
                                                                <button
                                                                  key={
                                                                    this.state
                                                                      .shaikhName
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
                                                            {data.filePath &&
                                                              this.state
                                                                .shaikhName &&
                                                              data.verseId ===
                                                                verse._id && (
                                                                <div
                                                                  key={
                                                                    verse._id
                                                                  }
                                                                >
                                                                  <p>
                                                                    استمع جيدا
                                                                    الى التسجيل
                                                                    الاتى.
                                                                  </p>
                                                                  <audio
                                                                    className="Audio"
                                                                    src={
                                                                      data.filePath
                                                                    }
                                                                    controls
                                                                  ></audio>
                                                                  <p className="my-2">
                                                                    الان اضغط
                                                                    على
                                                                    {
                                                                      <FontAwesomeIcon
                                                                        className="mx-1"
                                                                        icon={
                                                                          faMicrophone
                                                                        }
                                                                      />
                                                                    }{" "}
                                                                    وابدء
                                                                    بالقراءة كما
                                                                    سمعت فى
                                                                    التسجيل ثم
                                                                    اضغط على
                                                                    {
                                                                      <FontAwesomeIcon
                                                                        className="mx-1"
                                                                        icon={
                                                                          faStopCircle
                                                                        }
                                                                      />
                                                                    }{" "}
                                                                    بعد انتهائك
                                                                    من التسجيل.
                                                                  </p>
                                                                  <Mic
                                                                    className="mt-2"
                                                                    verseId={
                                                                      verse._id
                                                                    }
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
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          </div>
                        )}
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
