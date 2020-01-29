import React, { Component } from "react";
import SideBar from "./SideBar";

class Login extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <SideBar></SideBar>
          <div className="col-10 container py-5 mt-5">
            <h1 className="text-center">Login</h1>
            <form className="p-4 m-auto">
              <div className="form-group">
                <label htmlFor="exampleDropdownFormEmail2">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleDropdownFormEmail2"
                  placeholder="email@example.com"
                ></input>
              </div>
              <div className="form-group">
                <label htmlFor="exampleDropdownFormPassword2">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleDropdownFormPassword2"
                  placeholder="Password"
                ></input>
              </div>
              <div className="form-group"></div>
              <button type="submit" className="btn btn-primary">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
