import React from "react";
import logo from "./logo.svg";
import { Route } from "react-router-dom";
import "./App.css";
import "./components/NavBar";
import Home from "./components/Home";
import A7kam from "./components/A7kam";
import Login from "./components/Login";
import SideBar from "./components/SideBar";
import AdminPanel from "./components/AdminPanel";

function App() {
  return (
    <React.Fragment>
      <Route path="/adminPanel" component={AdminPanel}></Route>
      <Route path="/A7kam" component={A7kam}></Route>
      <Route path="/Login" component={Login}></Route>
      <Route exact path="/" component={Home}></Route>
    </React.Fragment>
  );
}

export default App;
