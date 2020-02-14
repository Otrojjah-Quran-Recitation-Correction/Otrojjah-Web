import React, { Component } from "react";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <a className="navbar-brand" href="/">
          Navbar
        </a>
        <div className="navbar-nav">
          <a className="nav-item nav-link active" href="/">
            Home <span className="sr-only">(current)</span>
          </a>
          <a className="nav-item nav-link" href="#discription">
            Discription
          </a>
          <a className="nav-item nav-link" href="#demo">
            Demo
          </a>
          <a className="nav-item nav-link" href="#about">
            About
          </a>
          <a className="nav-item nav-link" href="/adminPanel">
            Admin Panel
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
