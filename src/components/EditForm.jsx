import React, { Component } from "react";
import Joi from "joi-browser";
import { updateUser, getUser } from "../services/usersServices";

class EditForm extends Component {
  state = {
    user: {
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

  async componentDidMount() {
    const { data: user } = await getUser(this.props.match.params.id);
    const newUser = {
      name: user.name,
      email: user.email,
      password: null,
      phoneNumber: user.phoneNumber,
      isShaikh: true
    };
    this.setState({ user: newUser });
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.user, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleSubmit = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log(errors);
    //const user = jwt_decode(this.props.token);
    const user = { ...this.state.user };
    const err = await updateUser(user, this.props.match.params.id);
    if (!err) {
      this.setState({ user });
      window.location = "/adminPanel";
    }
  };

  handleChange = e => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];

    const user = { ...this.state.user };
    user[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ user, errors });
  };

  render() {
    return (
      <div className="container">
        <h1>Edit Form</h1>
        <form onSubmit={this.handleSubmit} className="mt-5">
          <label htmlFor=""> Username</label>
          <input
            placeholder="Username"
            className="form-control mb-3"
            type="text"
            id="username"
            name="name"
            onChange={this.handleChange}
            value={this.state.user.name}
            error={this.state.errors.name}
          />
          {this.state.errors.name && (
            <div className="alert  alert-danger">{this.state.errors.name}</div>
          )}
          <label htmlFor="email"> Email</label>
          <input
            placeholder="Email"
            className="form-control mb-3"
            type="text"
            id="email"
            name="email"
            onChange={this.handleChange}
            value={this.state.user.email}
            error={this.state.errors.email}
          />
          {this.state.errors.email && (
            <div className="alert alert-danger">{this.state.errors.email}</div>
          )}
          <label htmlFor="password"> Password</label>
          <input
            placeholder="Password"
            className="form-control mb-3"
            type="text"
            id="password"
            name="password"
            onChange={this.handleChange}
            value={this.state.user.password}
            error={this.state.errors.password}
          />
          {this.state.errors.password && (
            <div className="alert alert-danger">
              {this.state.errors.password}
            </div>
          )}
          <label htmlFor="phoneNumber">phoneNumber</label>
          <input
            placeholder="phoneNumber"
            className="form-control mb-3"
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            onChange={this.handleChange}
            value={this.state.user.phoneNumber}
            error={this.state.errors.phoneNumber}
          />
          {this.state.errors.phoneNumber && (
            <div className="alert alert-danger">
              {this.state.errors.phoneNumber}
            </div>
          )}
          <button className="btn btn-warning px-4">Edit</button>
        </form>
      </div>
    );
  }
}

export default EditForm;
