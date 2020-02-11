import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import "./components/navBar";
import Home from "./components/home";
import A7kam from "./components/a7kam";
import Login from "./components/login";
import EditUserForm from "./components/editUserForm";
import AdminPanel from "./components/adminPanel";
import Shea5 from "./components/shea5";
import RegisterUserForm from "./components/registerUserForm";

function App() {
  return (
    <React.Fragment>
      <Route path="/adminPanel" component={AdminPanel}></Route>
      <Route path="/registerUser" component={RegisterUserForm}></Route>
      <Route path="/editUser/:id" component={EditUserForm}></Route>
      <Route path="/a7kam" component={A7kam}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/shea5" component={Shea5}></Route>
      <Route exact path="/" component={Home}></Route>
    </React.Fragment>
  );
}

export default App;
