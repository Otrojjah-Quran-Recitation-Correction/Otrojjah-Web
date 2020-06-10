import React, { Component } from "react";
import { Link } from "react-router-dom";
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
      if (user.isShaikh) window.location = "/label";
      else if (user.isAdmin) window.location = "/adminPanel";
      else window.location = "/";
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
        <div className="pb-5 ">
          <div className="container pb-5 rule">
            <div className="row pt-5">
              <div className="col-md-3"></div>
              <form
                onSubmit={this.handleLogin}
                className="text-center p-4  m-auto col-md-6"
              >
                <h1 className="pt-4">تسجيل الدخول</h1>
                <div className="form-group pt-4">
                  <label htmlFor="exampleDropdownFormEmail2">
                    البريد الالكترونى
                  </label>
                  <input
                    placeholder="البريد الالكترونى"
                    className="form-control mb-3 text-center"
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
                    className="form-control mb-3 text-center"
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
                  className="result_btn mb-4"
                >
                  دخول
                </button>

                <Link style={{ color: "white" }} to="/register">
                  <button style={{ width: "100%" }} className="result_btn">
                    تسجيل
                  </button>
                </Link>
              </form>
              <div className="col-md-3"></div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
