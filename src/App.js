import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.css";
import "./components/navBar";
import Home from "./components/home";
import A7kam from "./components/a7kam";
import Shar7 from "./components/shar7";
import Login from "./components/login";
import NotFound from "./components/notFound";
import EditUserForm from "./components/editUserForm";
import EditClientForm from "./components/editClientForm";
import EditShaikhForm from "./components/editShaikhForm";
import AdminPanel from "./components/adminPanel";
import Label from "./components/label";
import RegisterUserForm from "./components/registerUserForm";
import ShaikhRecordsForm from "./components/shaikhRecordsForm";
import ClientRecordsForm from "./components/clientRecordsForm";
import ProtectedRoute from "./components/common/protectedRoute";
import ShaikhRoute from "./components/common/shaikhRoute";
import LoginRoute from "./components/common/loginRoute";
import NavBar from "./components/navBar";
import jwt_decode from "jwt-decode";

class App extends Component {
  state = { jwt: "", userRole: "" };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwt_decode(jwt);
      const userRole = user.isShaikh ? "shaikh" : "admin";
      this.setState({ jwt, userRole, user });
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
          <ProtectedRoute
            path="/adminPanel"
            component={AdminPanel}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/registerUser"
            component={RegisterUserForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/downloadShaikhRecords"
            component={ShaikhRecordsForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/downloadClientRecords"
            component={ClientRecordsForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/editUser/:id"
            component={EditUserForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/editClient/:id"
            component={EditClientForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/editShaikhRecord/:id"
            component={EditShaikhForm}
          ></ProtectedRoute>
          <ShaikhRoute path="/label" component={Label}></ShaikhRoute>
          <LoginRoute path="/login" component={Login}></LoginRoute>
          <Route path="/احكام/:id" component={Shar7}></Route>
          <Route path="/احكام" component={A7kam}></Route>
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
