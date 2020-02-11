import React, { Component } from "react";
import RegisterForm from "./registerUserForm";
//import AdminSideBar from "./AdminSideBar/AdminSideBar.jsx";
import Client from "./client";
import User from "./user";

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
                <User></User>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-clients"
                role="tabpanel"
                aria-labelledby="v-pills-clients-tab"
              >
                <div className="container row">
                  <div className="col">
                    <Client></Client>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="v-pills-shaikh"
                role="tabpanel"
                aria-labelledby="v-pills-shaikh-tab"
              >
                <div className="container row">
                  <div className="col">
                    <audio controls>
                      <source
                        src="https://docs.google.com/uc?export=download&id=12qmkQtz-Fojjl0zUgYkT_1cCUI5hhZy4"
                        type="audio/mpeg"
                      />
                    </audio>
                  </div>
                  <div className="col">
                    <button className="btn btn-danger">Delete</button>
                  </div>
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
