import React, { Component } from "react";
import { getRules } from "../services/rulesServices";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    rules: [],
    user: {},
    rulesClass: "displayNone",
    activePage: "home",
    activeRule: "",
    loginAlert: "none"
  };

  async componentDidUpdate(prevProps, prevState) {
    const root = this.props.root;
    let loginAlert = "flex";
    if (root[0] && !prevState.rules[0]) {
      const { data: rules } = await getRules(root[0]._id);
      if (this.props.userRole) loginAlert = "none";
      this.setState({ rules, loginAlert });
    }
  }

  showRules = page => {
    let rulesClass = this.state.rulesClass;
    let activePage = page;
    rulesClass = rulesClass ? "" : "displayNone";
    this.setState({ rulesClass, activePage });
  };

  activateButton = (page, rule = "") => {
    const activePage = page;
    const activeRule = rule;
    let rulesClass = rule ? "" : "displayNone";
    this.setState({ activePage, activeRule, rulesClass });
  };

  render() {
    const { userRole } = this.props;
    const {
      rules,
      rulesClass,
      activePage,
      activeRule,
      loginAlert
    } = this.state;
    return (
      <React.Fragment>
        {!userRole && (
          <div
            style={{
              display: `${loginAlert}`,
              position: "fixed",
              top: "0",
              width: "100%",
              zIndex: "13121352136"
            }}
            className="rule"
          >
            <p className="pt-3 mr-5" style={{ display: "inline-block" }}>
              انت لست مشترك فى الأترجة . قم بالأشتراك حتى تتمكن من استخدام
              البرنامج.
            </p>

            <Link to="/register" className="result_btn ltr  mr-auto m-2">
              اشترك الان
            </Link>
          </div>
        )}
        <div className="container px-0">
          <div className="rule mb-5" style={{ height: "20px" }}></div>
          <div className="nav_bg ltr">
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {!userRole && (
                <Link
                  onClick={() => this.activateButton("login")}
                  to="/login"
                  className={`ltr result_btn mx-2 my-4 ml-4 ${
                    activePage === "login" ? "btn_active" : ""
                  }`}
                >
                  تسجيل الدخول
                </Link>
              )}
              {userRole && (
                <Link
                  onClick={this.props.handleLogOut}
                  to="/"
                  className="ltr result_btn mx-2 my-4 ml-4"
                >
                  تسجيل الخروج
                </Link>
              )}
              <Link
                onClick={() => this.activateButton("home")}
                to="/"
                className={`ltr result_btn mx-2 my-4 `}
              >
                الأترجة
              </Link>
              <div
                className="ml-auto"
                style={{ display: "flex", marginRight: "100px" }}
              >
                {userRole === "admin" && (
                  <Link
                    onClick={() => this.activateButton("admin")}
                    to="/adminPanel"
                    className={`result_btn mx-2 my-4 ${
                      activePage === "admin" ? "btn_active" : ""
                    }`}
                  >
                    AdminPanel
                  </Link>
                )}
                {userRole && userRole !== "client" && (
                  <Link
                    onClick={() => this.activateButton("label")}
                    to="/label"
                    className={`result_btn mx-2 my-4 ${
                      activePage === "label" ? "btn_active" : ""
                    }`}
                  >
                    تقييم
                  </Link>
                )}
                <Link
                  onClick={() => this.showRules("rules")}
                  className={`result_btn mx-2 my-4 ${
                    activePage === "rules" ? "btn_active" : ""
                  }`}
                >
                  الأحكام
                </Link>
                <Link
                  onClick={() => this.activateButton("home")}
                  to="/"
                  className={`result_btn mx-2 my-4 ${
                    activePage === "home" ? "btn_active" : ""
                  }`}
                >
                  الرئيسية
                </Link>
              </div>
            </div>
            <div
              className={`ml-auto rtl ${rulesClass}`}
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginRight: "100px"
              }}
            >
              {rules &&
                rules.map(rule => (
                  <Link
                    key={rule._id}
                    onClick={() => this.activateButton("rules", rule.name)}
                    className={`result_btn mx-2 mb-1 ${
                      activeRule === rule.name ? "btn_active" : ""
                    }`}
                    to={`/احكام/${rule._id}`}
                  >
                    {rule.name}
                  </Link>
                ))}
            </div>
            <div className="nav_line mt-2 mb-1"></div>
            <div className="nav_line" style={{ height: "5px" }}></div>
          </div>
          <div className="navlogo">
            <Link onClick={() => this.activateButton("home")} to="/">
              <img alt="اترجة" src="../photos/logo4.png" />
            </Link>
          </div>
          <div className="navlogominmizer"></div>
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
