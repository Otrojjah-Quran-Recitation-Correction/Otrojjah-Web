import React from "react";
import Joi from "joi-browser";
import { updateUser, getUser } from "../services/usersServices";
import Form from "./common/form";

class EditUserForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      isShaikh: true
    },
    errors: {
      name: "",
      email: "",
      password: "",
      phoneNumber: ""
    },
    jwt: ""
  };
  schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Username"),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email()
      .label("Email"),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Password"),
    phoneNumber: Joi.number()
      .min(7)
      .required()
      .label("phoneNumber"),
    isShaikh: Joi.boolean()
  };

  async componentDidMount() {
    const { data } = await getUser(this.props.match.params.id);
    const jwt = localStorage.getItem("token");
    const newUser = {
      name: data.name,
      email: data.email,
      password: "",
      phoneNumber: data.phoneNumber,
      isShaikh: true
    };
    this.setState({ data: newUser, jwt });
  }

  doSubmit = async () => {
    const user = { ...this.state.data };
    const jwt = this.state.jwt;
    const err = await updateUser(user, this.props.match.params.id, jwt);
    if (!err) {
      this.props.history.push("/adminPanel");
    }
  };

  render() {
    return (
      <div className="container my-5 bt-3">
        <h1>Edit Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password")}
          {this.renderInput("phoneNumber", "PhoneNumber", "number")}
          {this.renderButton("Edit")}
        </form>
      </div>
    );
  }
}

export default EditUserForm;
