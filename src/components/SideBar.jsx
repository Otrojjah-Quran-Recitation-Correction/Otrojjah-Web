import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <div className="col-2">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/Login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/label">
              Labeling
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/A7kam">
              A7kam
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/#discription">
              Discription
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/#about">
              About
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default SideBar;
