import React from "react";
import Joi from "joi-browser";
import { addUser } from "../services/usersServices";
import Form from "./common/form";

class RegisterUserForm extends Form {
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
    }
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

  doSubmit = async () => {
    const err = await addUser(this.state.data);
    if (!err) {
      window.location = "/adminPanel";
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Regiseration Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("phoneNumber", "PhoneNumber", "number")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default RegisterUserForm;
