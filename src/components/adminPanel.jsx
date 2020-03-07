import React, { Component } from "react";
import Client from "./client";
import User from "./user";
import Shaikh from "./shaikh";

class AdminPanel extends Component {
  state = { jwt: "" };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    this.setState({ jwt });
  }

  render() {
    const { jwt } = this.state;
    return (
      <React.Fragment>
        <div className="my-4 mx-5">
          <div className="row ml-0">
            <div className="col-3 my-5 py-5 mainComponent">
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
                  className="nav-link active my-2"
                  id="v-pills-users-tab"
                  data-toggle="pill"
                  href="#v-pills-users"
                  role="tab"
                  aria-controls="v-pills-users"
                  aria-selected="true"
                >
                  users
                </a>
                <a
                  className="nav-link my-2"
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
                  className="nav-link my-2"
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
            <div className="col-9 my-5 py-5 mainComponent">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-users"
                  role="tabpanel"
                  aria-labelledby="v-pills-users-tab"
                >
                  <div className="container">
                    <User jwt={jwt}></User>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-clients"
                  role="tabpanel"
                  aria-labelledby="v-pills-clients-tab"
                >
                  <div className="container">
                    <Client jwt={jwt}></Client>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-shaikh"
                  role="tabpanel"
                  aria-labelledby="v-pills-shaikh-tab"
                >
                  <div className="container">
                    <Shaikh jwt={jwt}></Shaikh>
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
