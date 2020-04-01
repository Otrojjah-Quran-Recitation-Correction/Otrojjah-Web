import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUserRole } from "../../services/usersServices";

const ShaikhRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!(getUserRole() === "admin" || "shaikh")) {
          return (
            <Redirect
              to={{
                pathname: "/not-found",
                state: { from: props.location }
              }}
            />
          );
        }
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ShaikhRoute;
