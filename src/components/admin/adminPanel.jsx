import React, { Component } from "react";
import User from "./users/user";
import Rule from "./rules/rule";
import { getRoot } from "../../services/rulesServices";
import Alert from "../common/alert";

class AdminPanel extends Component {
  state = { jwt: "", ruleId: "", labelAlert: "", deleteUser: false };

  async componentDidMount() {
    const { data: root } = await getRoot();
    const jwt = localStorage.getItem("token");
    const ruleId = root[0]._id;
    this.setState({ jwt, ruleId });
  }

  handleAlert = user => {
    const labelAlert = user;
    this.setState({ labelAlert });
  };

  handleUserDelete = async () => {
    const deleteUser = true;
    this.setState({ deleteUser });
  };

  handleClose = () => {
    const labelAlert = "";
    this.setState({ labelAlert });
  };

  render() {
    const { jwt, ruleId, labelAlert, deleteUser } = this.state;
    return (
      <React.Fragment>
        {labelAlert && (
          <Alert
            label={labelAlert}
            handleClose={this.handleClose}
            handleAccept={this.handleUserDelete}
          ></Alert>
        )}
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
                  Users
                </a>
                <a
                  className="nav-link my-2"
                  id="v-pills-rules-tab"
                  data-toggle="pill"
                  role="tab"
                  aria-controls="v-pills-rules"
                  href="#v-pills-rules"
                >
                  Rules
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
                    <User
                      deleteUser={deleteUser}
                      user={labelAlert}
                      handleAlert={this.handleAlert}
                      jwt={jwt}
                    ></User>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-rules"
                  role="tabpanel"
                  aria-labelledby="v-pills-rules-tab"
                >
                  <div className="container">
                    <Rule ruleId={ruleId} jwt={jwt}></Rule>
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
