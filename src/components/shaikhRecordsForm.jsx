import React from "react";
import Joi from "joi-browser";
import { downloadRecords } from "../services/shaikhRecordsServices";
import Form from "./common/form";

class ShaikhRecordsForm extends Form {
  state = {
    data: {
      folderId: "",
      ayah: "",
      hokm: ""
    },
    errors: {
      folderId: "",
      ayah: "",
      hokm: ""
    },
    jwt: ""
  };
  schema = {
    folderId: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required()
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    this.setState({ jwt });
  }
  doSubmit = async () => {
    const jwt = this.state.jwt;
    const err = await downloadRecords(this.state.data, jwt);
    if (!err) {
      window.location = "/adminPanel";
    }
  };

  render() {
    return (
      <div className=" py-5">
        <div className="container mainComponent my-5 bt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 my-5">
              <h1>Download Records Form</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("folderId", "FolderId")}
                {this.renderInput("ayah", "Ayah")}
                {this.renderInput("hokm", "Hokm")}
                {this.renderButton("Download")}
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShaikhRecordsForm;
