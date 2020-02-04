import React, { Component } from "react";
import Form from "../components/Form";
//import AdminSideBar from "./AdminSideBar/AdminSideBar.jsx";

class AdminPanel extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div class="row">
          <div class="col-3">
            <div>
              <h3>Admin Panel</h3>
            </div>
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                class="nav-link active"
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
                class="nav-link"
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
                class="nav-link"
                id="v-pills-shaikh-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="v-pills-shaikh"
                href="#v-pills-shaikh"
              >
                Shaikh
              </a>
              <a
                class="nav-link"
                id="v-pills-register-tab"
                data-toggle="pill"
                role="tab"
                aria-controls="v-pills-register"
                href="#v-pills-register"
              >
                Register
              </a>
            </div>
          </div>
          <div class="col-9">
            <div class="tab-content" id="v-pills-tabContent">
              <div
                class="tab-pane fade show active"
                id="v-pills-users"
                role="tabpanel"
                aria-labelledby="v-pills-users-tab"
              >
                ...
              </div>
              <div
                class="tab-pane fade"
                id="v-pills-clients"
                role="tabpanel"
                aria-labelledby="v-pills-clients-tab"
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
              <div
                class="tab-pane fade"
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
              <div
                class="tab-pane fade"
                id="v-pills-register"
                role="tabpanel"
                aria-labelledby="v-pills-register-tab"
              >
                <Form></Form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminPanel;
