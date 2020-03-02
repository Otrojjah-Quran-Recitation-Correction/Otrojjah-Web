import React from "react";
import Joi from "joi-browser";
import {
  updateShaikhRecord,
  getShaikhRecord
} from "../services/shaikhRecordsServices";
import Form from "./common/form";

class EditShaikhForm extends Form {
  state = {
    data: {
      shaikhName: "",
      ayah: "",
      hokm: ""
    },
    errors: {
      shaikhName: "",
      ayah: "",
      hokm: ""
    },
    jwt: ""
  };
  schema = {
    shaikhName: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required()
  };

  async componentDidMount() {
    const { data } = await getShaikhRecord(this.props.match.params.id);
    const jwt = localStorage.getItem("token");
    const newShaikh = {
      shaikhName: data.shaikhName,
      ayah: data.ayah,
      hokm: data.hokm
    };
    this.setState({ data: newShaikh, jwt });
  }

  doSubmit = async () => {
    const shaikh = { ...this.state.data };
    const jwt = this.state.jwt;
    const err = await updateShaikhRecord(
      shaikh,
      this.props.match.params.id,
      jwt
    );
    if (!err) {
      this.props.history.push("/adminPanel");
    }
  };

  render() {
    return (
      <div className=" py-5">
        <div className="container mainComponent my-5 bt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 my-5">
              <h1>Edit Form</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("shaikhName", "ShaikhName")}
                {this.renderInput("ayah", "Ayah")}
                {this.renderInput("hokm", "Hokm")}
                {this.renderButton("Edit")}
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditShaikhForm;
