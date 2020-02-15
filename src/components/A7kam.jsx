import React from "react";
import Mic from "./mic";
import Joi from "joi-browser";
import Form from "./common/form";
import { getShaikhRecords } from "../services/shaikhRecordsServices";

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
    validateError: "",
    shiokhRecords: [],
    a7kam: [{ hokm: "Ekhfaa" }],
    ayat: [{ ayah: "naran_thaat" }, { ayah: "mn_masad" }],
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
    const validateError = "";
    const data = { ...this.state.data };

    data.link = "";
    data.shaikhName = "";
    data.hokm = hokm;
    data.ayah = ayah.ayah;

    const ayahRecords = this.state.shiokhRecords.filter(
      e => e.ayah === data.ayah
    );
    this.setState({ data, validateError, ayahRecords });
  };

  validateShaikhAyah = () => {
    const data = { ...this.state.data };
    if (data.shaikhName && data.ayah) {
      const validateError = "";
      const shaikh = this.state.ayahRecords.filter(
        e => e.shaikhName === data.shaikhName
      );
      data.link = shaikh[0].link;
      this.setState({ data, validateError });
      return true;
    } else if (data.ayah) {
      const validateError = "Please Select a Shaikh";
      this.setState({ validateError });
      return false;
    } else {
      const validateError = "Please Select Ayah";
      this.setState({ validateError });
      return false;
    }
  };

  render() {
    const { a7kam, data, ayat, validateError, ayahRecords } = this.state;
    return (
      <React.Fragment>
        <div className="pt-5">
          <div className="accordion pt-3 my-5 container " id="accordionExample">
            {a7kam.map(hokm => (
              <div key={hokm.hokm} className="card">
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
                      {hokm.hokm}
                    </button>
                  </h2>
                </div>

                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#accordionExample"
                >
                  <div className="card-body">
                    {ayat.map(ayah => (
                      <button
                        key={ayah.ayah}
                        onClick={() => this.handleAyah(ayah, hokm.hokm)}
                        className="btn btn-info ml-2"
                      >
                        {ayah.ayah}
                      </button>
                    ))}
                    {data.ayah && (
                      <form>
                        {this.renderSelect(
                          "shaikhName",
                          "shaikhName",
                          ayahRecords
                        )}
                      </form>
                    )}
                    <div>
                      {validateError && (
                        <div className="alert alert-danger">
                          {validateError}
                        </div>
                      )}
                      <button
                        className="btn btn-dark my-2"
                        onClick={this.validateShaikhAyah}
                      >
                        Start
                      </button>
                    </div>
                    {data.link && (
                      <div>
                        <audio controls>
                          <source src={data.link} type="audio/wav" />
                        </audio>
                        <Mic hokm={hokm.hokm} ayah={data.ayah}></Mic>
                      </div>
                    )}
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
