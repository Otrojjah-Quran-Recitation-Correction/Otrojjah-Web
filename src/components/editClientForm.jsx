import React from "react";
import Joi from "joi-browser";
import { updateClient, getClient } from "../services/clientsServices";
import Form from "./common/form";

class EditClientForm extends Form {
  state = {
    data: {
      recordName: "",
      ayah: "",
      hokm: ""
    },
    errors: {
      recordName: "",
      ayah: "",
      hokm: ""
    }
  };
  schema = {
    recordName: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required()
  };

  async componentDidMount() {
    const { data } = await getClient(this.props.match.params.id);
    const newClient = {
      recordName: data.recordName,
      ayah: data.ayah,
      hokm: data.hokm
    };
    this.setState({ data: newClient });
  }

  doSubmit = async () => {
    const client = { ...this.state.data };
    const err = await updateClient(client, this.props.match.params.id);
    if (!err) {
      this.props.history.push("/adminPanel");
    }
  };

  render() {
    return (
      <div className="container my-5 bt-3">
        <h1>Edit Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("recordName", "RecordName")}
          {this.renderInput("ayah", "Ayah")}
          {this.renderInput("hokm", "Hokm")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditClientForm;
