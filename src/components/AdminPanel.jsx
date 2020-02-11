import React, { Component } from "react";
import Client from "./client";
import User from "./user";
import Shaikh from "./shaikh";

class AdminPanel extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <div>
              <h3>Admin Panel</h3>
            </div>
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className="nav-link active"
                id="v-pills-users-tab"
                data-toggle="pill"
                href="#v-pills-users"
                role="tab"
                aria-controls="v-pills-users"
                aria-selected="true"
              >
                Users
              </a>
              <a
                className="nav-link"
                id="v-pills-clients-tab"
                data-toggle="pill"
                href="#v-pills-clients"
                role="tab"
                aria-controls="v-pills-clients"
                aria-selected="false"
              >
                Clients
              </a>
              <a
                className="nav-link"
                id="v-pills-shaikh-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="v-pills-shaikh"
                href="#v-pills-shaikh"
              >
                Shaikh
              </a>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="v-pills-users"
                role="tabpanel"
                aria-labelledby="v-pills-users-tab"
              >
                <div className="container">
                  <User></User>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-clients"
                role="tabpanel"
                aria-labelledby="v-pills-clients-tab"
              >
                <div className="container">
                  <Client></Client>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-shaikh"
                role="tabpanel"
                aria-labelledby="v-pills-shaikh-tab"
              >
                <div className="container">
                  <Shaikh></Shaikh>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPanel;
