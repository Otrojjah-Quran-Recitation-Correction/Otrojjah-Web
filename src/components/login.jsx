import React, { Component } from "react";
import { loginUser } from "../services/authServices";
import Joi from "joi-browser";
import jwt_decode from "jwt-decode";

class Login extends Component {
  state = {
    login: {
      email: "",
      password: ""
    },
    errors: {
      email: "",
      password: ""
    },
    user: ""
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
    const jwt = await loginUser(
      this.state.login.email,
      this.state.login.password
    );
    if (jwt) {
      localStorage.setItem("token", jwt.data);
      const login = {
        email: "",
        password: ""
      };
      const user = jwt_decode(jwt.data);
      this.setState({
        login
      });
      user.isShaikh
        ? (window.location = "/label")
        : (window.location = "/adminPanel");
    }
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
        <div className="py-5 mt-5">
          <div className="container">
            <div className="row">
              <div className="col"></div>
              <form
                onSubmit={this.handleLogin}
                className="login p-4 col m-auto"
              >
                <h1>تسجيل الدخول</h1>
                <div className="form-group pt-4">
                  <label htmlFor="exampleDropdownFormEmail2">
                    البريد الالكترونى
                  </label>
                  <input
                    placeholder="البريد الالكترونى"
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
                  <label htmlFor="exampleDropdownFormPassword2">
                    كلمة السر
                  </label>
                  <input
                    placeholder="كلمة السر"
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
                <button
                  type="submit"
                  style={{ width: "100%" }}
                  className="btn btn-primary"
                >
                  دخول
                </button>
              </form>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
