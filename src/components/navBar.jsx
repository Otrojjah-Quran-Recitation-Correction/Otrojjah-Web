import React, { Component } from "react";
import { getRules } from "../services/rulesServices";
import { getUserData } from "../services/usersServices";

class NavBar extends Component {
  state = { rules: [], user: {} };

  // async componentDidMount() {
  //   const jwt = localStorage.getItem("token");
  //   const { data: user } = await getUserData(jwt);
  //   console.log(user);
  //   this.setState({ user });
  // }

  async componentDidUpdate(prevProps, prevState) {
    const root = this.props.root;
    if (!prevState.rules[0]) {
      const { data: rules } = await getRules(root[0]._id);
      this.setState({ rules });
    }
  }

  render() {
    const { userRole } = this.props;
    const { rules } = this.state;
    return (
      <nav className="navBar navbar navbar-expand-lg navbar-dark  fixed-top mb-5 ltr">
        <a className="navbar-brand ml-2" href="/">
          اترجة
        </a>
        {userRole && (
          <a
            onClick={this.props.handleLogOut}
            style={{ cursor: "pointer" }}
            className="navitem"
            href="/"
          >
            تسجيل الخروج <span className="sr-only">(current)</span>
          </a>
        )}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto rtl">
            <li className="nav-item active navitem">
              <a className="nav-link" href="/">
                الرئيسية <span className="sr-only">(current)</span>
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link navitem dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                الاحكام
              </a>
              <div
                className="dropdown-menu a7kam-menu"
                aria-labelledby="navbarDropdown"
                style={{ minWidth: 15 + "rem" }}
              >
                {rules.map(rule => (
                  <a
                    key={rule._id}
                    className="dropdown-item text-right a7kam-item"
                    href={`/احكام/${rule._id}`}
                  >
                    {rule.name}
                  </a>
                ))}
              </div>
            </li>
            <li className="nav-item">
              {!userRole && (
                <a className="nav-link navitem" href="/login">
                  تسجيل الدخول
                </a>
              )}
            </li>
            <li className="nav-item">
              {userRole && userRole !== "client" && (
                <a className="nav-link navitem" href="/label">
                  تقييم
                </a>
              )}
            </li>
            <li className="nav-item">
              {userRole === "admin" && (
                <a className="nav-link navitem" href="/adminPanel">
                  Admin Panel
                </a>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
