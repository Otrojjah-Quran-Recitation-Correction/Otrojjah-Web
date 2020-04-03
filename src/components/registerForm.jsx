import React from "react";
import Joi from "joi-browser";
import { addClient } from "../services/usersServices";
import { loginUser } from "../services/authServices";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: ""
    },
    errors: {
      name: "",
      email: "",
      password: ""
    },
    jwt: ""
  };
  schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Name"),
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
      .label("Password")
  };

  doSubmit = async () => {
    const err = await addClient(this.state.data);
    if (!err) {
      const jwt = await loginUser(
        this.state.data.email,
        this.state.data.password
      );
      if (jwt) {
        localStorage.setItem("token", jwt.data);
        window.location = "/";
      }
    }
  };

  render() {
    return (
      <div className=" py-5">
        <div className="container rule my-5 bt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 my-5">
              <h1>التسجيل</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "الاسم")}
                {this.renderInput("email", "الايميل", "email")}
                {this.renderInput("password", "كلمة السر", "password")}
                {this.renderButton("نسجيل")}
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
