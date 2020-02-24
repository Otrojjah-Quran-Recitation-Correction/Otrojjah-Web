import React from "react";
import { Link } from "react-router-dom";
import Mic from "./mic";
import Joi from "joi-browser";
import Form from "./common/form";
import { getShaikhRecords } from "../services/shaikhRecordsServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";

class A7kam extends Form {
  state = {
    data: {
      shaikhName: "",
      ayah: "",
      hokm: "",
      link: ""
    },
    errors: {
      shaikhName: "",
      ayah: "",
      hokm: "",
      link: ""
    },
    recordError: "",
    shiokhRecords: [],
    a7kam: [{ hokm: "Ekhfaa" }],
    ayat: [
      { ayah: "naran_thaat" },
      { ayah: "naran_thaat" },
      { ayah: "naran_thaat" },
      { ayah: "naran_thaat" }
    ],
    ayahRecords: []
  };
  schema = {
    shaikhName: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required(),
    link: Joi.string()
  };

  async componentDidMount() {
    const { data: shiokhRecords } = await getShaikhRecords();
    this.setState({ shiokhRecords });
  }

  handleAyah = (ayah, hokm) => {
    const recordError = "";
    const data = { ...this.state.data };

    data.shaikhName = "";
    data.hokm = hokm;
    data.ayah = ayah.ayah;

    const ayahRecords = this.state.shiokhRecords.filter(
      e => e.ayah === data.ayah
    );
    this.setState({ data, recordError, ayahRecords });
  };

  validateShaikhAyah = () => {
    const data = { ...this.state.data };
    if (data.shaikhName && data.ayah) {
      const recordError = "";
      const shaikh = this.state.ayahRecords.filter(
        e => e.shaikhName === data.shaikhName
      );
      data.link = shaikh[0].link;
      this.setState({ data, recordError });
      return true;
    } else if (data.ayah) {
      const recordError = "من فضلك اختر شيخ";
      this.setState({ recordError });
      return false;
    } else {
      const recordError = "من فضلك اختر اية";
      this.setState({ recordError });
      return false;
    }
  };

  render() {
    const { a7kam, data, ayat, recordError, ayahRecords } = this.state;
    return (
      <React.Fragment>
        <div className="pt-5">
          <div className="accordion pt-3 my-5 container " id="accordionExample">
            {a7kam.map(hokm => (
              <div key={hokm.hokm} className="card mainComponent">
                <div className="card-header" id="headingOne">
                  <h2 className="mb-0">
                    <button
                      className="btn btn-link"
                      type="button"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      حكم {hokm.hokm}
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="container mt-2 mr-2">
                    <p>
                      تعرف اكثر عن حكم {hokm.hokm}
                      <Link to={`/a7kam/${hokm.hokm}`}> من هنا</Link>
                    </p>{" "}
                  </div>
                  <div className="container row">
                    <div className="col-2"></div>
                    <div className="card-body text-center col-8">
                      <p>اختر الاية</p>
                      {ayat.map(ayah => (
                        <button
                          key={ayah.ayah}
                          onClick={() => this.handleAyah(ayah, hokm.hokm)}
                          className="btn btn-info ml-2 aya"
                        >
                          {ayah.ayah}
                        </button>
                      ))}
                      {data.ayah && (
                        <form className="mt-3">
                          {this.renderSelect(
                            "shaikhName",
                            "اختر الشيخ",
                            ayahRecords
                          )}
                        </form>
                      )}

                      {recordError && (
                        <div className="alert alert-danger">{recordError}</div>
                      )}
                      <div className=" my-2">
                        <button
                          className="btn btn-dark my-2"
                          onClick={this.validateShaikhAyah}
                        >
                          ابدء
                        </button>
                      </div>

                      <div>
                        {data.ayah && data.link && (
                          <div>
                            <p>استمع جيدا الى التسجيل الاتى.</p>
                            <audio
                              className="Audio"
                              src={data.link}
                              controls
                            ></audio>
                            <p className="my-2">
                              الان اضغط على
                              {
                                <FontAwesomeIcon
                                  className="mx-1"
                                  icon={faMicrophone}
                                />
                              }{" "}
                              وابدء بالقراءة كما سمعت فى التسجيل ثم اضغط على
                              {
                                <FontAwesomeIcon
                                  className="mx-1"
                                  icon={faStopCircle}
                                />
                              }{" "}
                              بعد انتهائك من التسجيل.
                            </p>
                            <Mic
                              className="mt-2"
                              hokm={hokm.hokm}
                              ayah={data.ayah}
                            ></Mic>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default A7kam;
