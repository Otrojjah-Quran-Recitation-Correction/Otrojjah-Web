import React, { Component } from "react";
import AdminSideBar from "./AdminSideBar/AdminSideBar.jsx";

class AdminPanel extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <AdminSideBar></AdminSideBar>
      </React.Fragment>
    );
  }
}

export default AdminPanel;
