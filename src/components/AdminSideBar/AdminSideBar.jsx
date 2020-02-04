import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./AdminSideBar.css";
import $ from "jquery";

class AdminSideBar extends Component {
  state = {};
  render() {
    return (
      <div class="wrapper">
        <nav id="sidebar">
          <div class="sidebar-header">
            <h3>Admin Panel</h3>
          </div>
          <ul class="list-unstyled components">
            <li>
              <a>Users</a>
            </li>
            <li>
              <a href="#">Clients</a>
            </li>
            <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
                class="dropdown-toggle"
              >
                Shaikh
              </a>
              <ul class="collapse list-unstyled" id="pageSubmenu">
                <li>
                  <a href="#">Register</a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default AdminSideBar;
