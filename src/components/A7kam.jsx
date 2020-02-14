import React, { Component } from "react";
import SideBar from "./sideBar";
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
    shiokh: [],
    a7kam: [{ hokm: "Ekhfaa" }],
    ayat: [{ ayah: "naran_thaat" }, { ayah: "mn_masad" }]
  };
  schema = {
    shaikhName: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required(),
    link: Joi.string()
  };

  async componentDidMount() {
    const { data: shiokh } = await getShaikhRecords();
    this.setState({ shiokh });
  }

  handleAyah = ayah => {
    const data = { ...this.state.data };
    data.link = "";
    data.ayah = ayah.ayah;
    this.setState({ data });
  };

  isShaya5 = () => {
    const data = { ...this.state.data };
    data.link = "";
    this.setState({ data });
    if (data.shaikhName && data.ayah) {
      const shiokh = this.state.shiokh.filter(
        e => e.shaikhName == data.shaikhName
      );

      const shaikh = shiokh.filter(e => e.ayah == data.ayah);
      data.link = shaikh[0].link;
      console.log(data);
      this.setState({ data });
      return true;
    }
    return false;
  };

  render() {
    const { shiokh, a7kam, data, ayat } = this.state;
    return (
      <React.Fragment>
        <div className="row">
          <SideBar></SideBar>
          <div className="accordion col-10" id="accordionExample">
            {a7kam.map(hokm => (
              <div className="card">
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
                    <form>
                      {this.renderSelect("shaikhName", "shaikhName", shiokh)}
                    </form>
                    {ayat.map(ayah => (
                      <button
                        onClick={() => this.handleAyah(ayah)}
                        className="btn btn-info mr-2"
                      >
                        {ayah.ayah}
                      </button>
                    ))}
                    <div>
                      <button
                        className="btn btn-dark my-2"
                        onClick={this.isShaya5}
                      >
                        Start
                      </button>
                    </div>
                    {data.link && (
                      <div>
                        <audio controls>
                          <source src={data.link} type="audio/wav" />
                        </audio>
                        <Mic></Mic>
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
