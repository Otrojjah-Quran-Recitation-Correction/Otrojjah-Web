import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import "./components/navBar";
import Home from "./components/home";
import A7kam from "./components/a7kam";
import Login from "./components/login";
import NotFound from "./components/notFound";
import EditUserForm from "./components/editUserForm";
import EditClientForm from "./components/editClientForm";
import EditShaikhForm from "./components/editShaikhForm";
import AdminPanel from "./components/adminPanel";
import Label from "./components/label";
import RegisterUserForm from "./components/registerUserForm";
import ShaikhRecordsForm from "./components/shaikhRecordsForm";
import NavBar from "./components/navBar";
import jwt_decode from "jwt-decode";

class App extends Component {
  state = { jwt: "", userRole: "" };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      this.setState({ jwt });
      const user = jwt_decode(jwt);
      const userRole = user.isShaikh ? "shaikh" : "admin";
      this.setState({ userRole, user });
    } catch (ex) {}
  }

  handleLogOut = () => {
    localStorage.removeItem("token", this.state.jwt);
    window.location = "/";
  };

  render() {
    const { userRole } = this.state;
    return (
      <React.Fragment>
        <NavBar userRole={userRole} handleLogOut={this.handleLogOut}></NavBar>
        <Switch>
          {userRole === "admin" && (
            <Route path="/adminPanel" component={AdminPanel}></Route>
          )}

          {userRole === "admin" && (
            <Route path="/registerUser" component={RegisterUserForm}></Route>
          )}
          {userRole === "admin" && (
            <Route
              path="/downloadShaikhRecords"
              component={ShaikhRecordsForm}
            ></Route>
          )}
          {userRole === "admin" && (
            <Route path="/editUser/:id" component={EditUserForm}></Route>
          )}
          {userRole === "admin" && (
            <Route path="/editClient/:id" component={EditClientForm}></Route>
          )}
          {userRole === "admin" && (
            <Route
              path="/editShaikhRecord/:id"
              component={EditShaikhForm}
            ></Route>
          )}

          {userRole && <Route path="/label" component={Label}></Route>}
          <Route path="/a7kam" component={A7kam}></Route>
          {!userRole && <Route path="/login" component={Login}></Route>}
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={Home}></Route>
          {userRole && <Redirect to="/not-found" />}
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
