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
    }
  };
  schema = {
    shaikhName: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required()
  };

  async componentDidMount() {
    const { data } = await getShaikhRecord(this.props.match.params.id);
    const newShaikh = {
      shaikhName: data.shaikhName,
      ayah: data.ayah,
      hokm: data.hokm
    };
    this.setState({ data: newShaikh });
  }
  //not working
  doSubmit = async () => {
    const shaikh = { ...this.state.data };
    const err = await updateShaikhRecord(shaikh, this.props.match.params.id);
    if (!err) {
      this.props.history.push("/adminPanel");
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Edit Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("shaikhName", "ShaikhName")}
          {this.renderInput("ayah", "Ayah")}
          {this.renderInput("hokm", "Hokm")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditShaikhForm;
