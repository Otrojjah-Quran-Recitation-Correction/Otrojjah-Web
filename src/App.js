import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import "./components/navBar";
import Home from "./components/home";
import A7kam from "./components/a7kam";
import Login from "./components/login";
import EditUserForm from "./components/editUserForm";
import EditClientForm from "./components/editClientForm";
import EditShaikhForm from "./components/editShaikhForm";
import AdminPanel from "./components/adminPanel";
import Label from "./components/label";
import RegisterUserForm from "./components/registerUserForm";
import ShaikhRecordsForm from "./components/shaikhRecordsForm";

function App() {
  return (
    <React.Fragment>
      <Route path="/adminPanel" component={AdminPanel}></Route>
      <Route path="/registerUser" component={RegisterUserForm}></Route>
      <Route
        path="/downloadShaikhRecords"
        component={ShaikhRecordsForm}
      ></Route>
      <Route path="/editUser/:id" component={EditUserForm}></Route>
      <Route path="/editClient/:id" component={EditClientForm}></Route>
      <Route path="/editShaikhRecord/:id" component={EditShaikhForm}></Route>
      <Route path="/a7kam" component={A7kam}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/label" component={Label}></Route>
      <Route exact path="/" component={Home}></Route>
    </React.Fragment>
  );
}

export default App;
