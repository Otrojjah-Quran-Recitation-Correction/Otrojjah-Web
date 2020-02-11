import React from "react";
import Joi from "joi-browser";
import { updateClient, getClient } from "../services/clientsServices";
import Form from "./common/form";

class EditClientForm extends Form {
  state = {
    data: {
      recordName: "",
      ayah: "",
      hokm: "",
      link: ""
    },
    errors: {
      recordName: "",
      ayah: "",
      hokm: "",
      link: ""
    }
  };
  schema = {
    recordName: Joi.string().required(),
    ayah: Joi.string().required(),
    hokm: Joi.string().required(),
    link: Joi.string()
  };

  async componentDidMount() {
    const { data } = await getClient(this.props.match.params.id);
    const newClient = {
      recordName: data.recordName,
      ayah: data.ayah,
      hokm: data.hokm,
      link: data.link
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
      <div className="container">
        <h1>Edit Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("recordName", "RecordName")}
          {this.renderInput("ayah", "Ayah")}
          {this.renderInput("hokm", "Hokm")}
          {this.renderInput("link", "Link")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditClientForm;
