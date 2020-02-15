import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    const { userRole } = this.props;
    return (
      <nav className="navBar navbar navbar-expand-lg navbar-dark  fixed-top mb-5">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
          {!userRole && (
            <a className="nav-item nav-link" href="/login">
              Login
            </a>
          )}
          <a className="nav-item nav-link" href="/#discription">
            Discription
          </a>
          <a className="nav-item nav-link" href="/#demo">
            Demo
          </a>
          <a className="nav-item nav-link" href="/#about">
            About
          </a>
          <a className="nav-item nav-link" href="/a7kam">
            A7kam
          </a>
          {userRole && (
            <a className="nav-item nav-link" href="/label">
              Label
            </a>
          )}
          {userRole == "admin" && (
            <a className="nav-item nav-link" href="/adminPanel">
              Admin Panel
            </a>
          )}
          {userRole && (
            <Link onClick={this.props.handleLogOut} className="nav-link">
              Logout <span className="sr-only">(current)</span>
            </Link>
          )}
        </div>
      </nav>
    );
  }
}

export default NavBar;
