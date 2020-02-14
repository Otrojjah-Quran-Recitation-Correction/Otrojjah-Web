import React, { Component } from "react";
import SideBar from "./sideBar";
import { loginUser } from "../services/loginServices";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    login: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    }
  };

  schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };

  validate = () => {
    const { error } = Joi.validate(this.state.login, this.schema);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  handleLogin = async e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return console.log(errors);
    const { data: jwt } = await loginUser(
      this.state.login.email,
      this.state.login.password
    );
    localStorage.setItem("token", jwt);
    console.log(jwt);
    const login = {
      email: "",
      password: ""
    };
    this.setState({
      login
    });
    //window.location = "/";
  };

  handleChange = e => {
    const login = {
      ...this.state.login
    };
    login[e.currentTarget.name] = e.currentTarget.value;
    this.setState({
      login
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <SideBar></SideBar>
          <form onSubmit={this.handleLogin}>
            <div className="col-10 container py-5 mt-5">
              <h1 className="text-center">Login</h1>
              <form className="p-4 m-auto">
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormEmail2">
                    Email address
                  </label>
                  <input
                    placeholder="Email"
                    className="form-control mb-3"
                    type="text"
                    id="email"
                    name="email"
                    onChange={this.handleChange}
                    value={this.state.login.email}
                    error={this.state.errors.email}
                  ></input>
                  {this.state.errors.email && (
                    <div className="alert alert-danger">
                      {this.state.errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleDropdownFormPassword2">Password</label>
                  <input
                    placeholder="Password"
                    className="form-control mb-3"
                    type="password"
                    id="password"
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.login.password}
                    error={this.state.errors.password}
                  ></input>
                  {this.state.errors.password && (
                    <div className="alert alert-danger">
                      {this.state.errors.password}
                    </div>
                  )}
                </div>
                <div className="form-group"></div>
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </form>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
