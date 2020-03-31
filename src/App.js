import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "./components/navBar";
import Home from "./components/home";
import Rules from "./components/rules";
import Login from "./components/login";
import NotFound from "./components/notFound";
import AdminPanel from "./components/admin/adminPanel";
import ShowLetters from "./components/admin/rules/showLetters";
import ShowSubRules from "./components/admin/rules/showSubRules";
import ShowVerses from "./components/admin/verses/showVerses";
import ShowRecords from "./components/admin/records/showRecords";
import ShowRecordLabel from "./components/admin/records/showRecordLabel";
import Label from "./components/label";
import RegisterUserForm from "./components/admin/users/registerUserForm";
import EditUserForm from "./components/admin/users/editUserForm";
import AddRuleForm from "./components/admin/rules/addRuleForm";
import EditRuleForm from "./components/admin/rules/editRuleForm";
import AddVerseForm from "./components/admin/verses/addVerseForm";
import EditVerseForm from "./components/admin/verses/editVerseForm";
import AddRecordForm from "./components/admin/records/addRecordForm";
import AddClientRecordForm from "./components/admin/records/addClientRecordForm";
import EditRecordForm from "./components/admin/records/editRecordForm";
import ProtectedRoute from "./components/common/protectedRoute";
import ShaikhRoute from "./components/common/shaikhRoute";
import LoginRoute from "./components/common/loginRoute";
import NavBar from "./components/navBar";
import { getRoot } from "./services/rulesServices";
import jwt_decode from "jwt-decode";

class App extends Component {
  state = { jwt: "", userRole: "", root: {} };

  async componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      let user = "";
      let userRole = "";
      if (jwt) user = jwt_decode(jwt);
      if (user) userRole = user.isShaikh ? "shaikh" : "admin";
      const { data: root } = await getRoot();
      this.setState({ jwt, userRole, root });
    } catch (ex) {}
  }

  handleLogOut = () => {
    localStorage.removeItem("token", this.state.jwt);
    window.location = "/";
  };

  render() {
    const { userRole, root } = this.state;
    return (
      <React.Fragment>
        <NavBar
          root={root}
          userRole={userRole}
          handleLogOut={this.handleLogOut}
        ></NavBar>
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
            path="/editUser/:id"
            component={EditUserForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/addRule/:id"
            component={AddRuleForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/editRule/:id"
            component={EditRuleForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/addVerse/:id"
            component={AddVerseForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/editVerse/:id"
            component={EditVerseForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/addRecord/:id"
            component={AddRecordForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/addClientRecord/:id"
            component={AddClientRecordForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/editRecord/:id"
            component={EditRecordForm}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/showLetters/:id"
            component={ShowLetters}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/showSubRules/:id"
            component={ShowSubRules}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/showVerses/:id"
            component={ShowVerses}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/showRecords/:id"
            component={ShowRecords}
          ></ProtectedRoute>
          <ProtectedRoute
            path="/showRecordLabel/:id"
            component={ShowRecordLabel}
          ></ProtectedRoute>
          <ShaikhRoute path="/label" component={Label}></ShaikhRoute>
          <LoginRoute path="/login" component={Login}></LoginRoute>
          <Route path="/احكام/:id" component={Rules}></Route>
          <Route path="/احكام" component={Rules}></Route>
          <Route path="/not-found" component={NotFound} />
          <Route exact path="/" component={Home}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
