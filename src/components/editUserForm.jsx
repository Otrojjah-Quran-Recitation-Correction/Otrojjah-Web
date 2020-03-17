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
    const jwt = localStorage.getItem("token");
    const { data } = await getUser(this.props.match.params.id, jwt);
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
    const jwt = localStorage.getItem("token");
    const err = await updateUser(user, this.props.match.params.id, jwt);
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
                {this.renderInput("name", "Name")}
                {this.renderInput("email", "Email", "email")}
                {this.renderInput("password", "Password")}
                {this.renderInput("phoneNumber", "PhoneNumber", "number")}
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

export default EditUserForm;
