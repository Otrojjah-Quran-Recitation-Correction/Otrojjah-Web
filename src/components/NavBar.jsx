import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    const { userRole } = this.props;
    return (
      <nav className="navBar navbar navbar-expand-lg navbar-dark  fixed-top mb-5 ltr">
        <a className="navbar-brand ml-2" href="/">
          اترجة
        </a>
        {userRole && (
          <a
            onClick={this.props.handleLogOut}
            style={{ cursor: "pointer" }}
            className="navbar-brand "
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
            <li className="nav-item active">
              <a className="nav-link" href="/">
                الرئيسية <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              {!userRole && (
                <a className="nav-link" href="/login">
                  تسجيل الدخول
                </a>
              )}
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
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
              >
                <a
                  className="dropdown-item text-right a7kam-item"
                  href="/احكام"
                >
                  الإظهار
                </a>
                <a
                  className="dropdown-item text-right a7kam-item"
                  href="/احكام"
                >
                  الإدغام
                </a>
                <a
                  className="dropdown-item text-right a7kam-item"
                  href="/احكام"
                >
                  الإقلاب
                </a>
                <a
                  className="dropdown-item text-right a7kam-item"
                  href="/احكام"
                >
                  الإخفاء
                </a>
              </div>
            </li>
            <li className="nav-item">
              {userRole && (
                <a className="nav-link" href="/label">
                  تقييم
                </a>
              )}
            </li>
            <li className="nav-item">
              {userRole === "admin" && (
                <a className="nav-link" href="/adminPanel">
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
