import React, { Component } from "react";

class Alert extends Component {
  state = {};
  render() {
    const { label } = this.props;
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        className="d-flex justify-content-center align-items-center labelhead"
        style={{ minHeight: 200 + "px" }}
      >
        <div
          className="toast labelalert"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <button
              type="button"
              className="ml-2 mb-1 close"
              data-dismiss="toast"
              aria-label="Close"
              onClick={() => this.props.handleClose()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
            {label !== "success" && (
              <h6 className="m-auto">هل انت متأكد من هذا الأختيار؟</h6>
            )}
            {label === "success" && (
              <h6 className="m-auto">تم التسجيل بنجاح!</h6>
            )}
          </div>
          {label !== "success" && (
            <div className="toast-body">
              <button
                style={{ width: 50 + "px" }}
                className="mx-1 btn btn-success"
                onClick={() => this.props.handleAccept(label)}
              >
                نعم
              </button>
              <button
                style={{ width: 50 + "px" }}
                className="mx-1 btn btn-danger"
                onClick={() => this.props.handleClose()}
              >
                لا
              </button>
            </div>
          )}
          {label === "success" && (
            <div className="toast-body text-center">
              <button
                style={{ width: 50 + "px" }}
                className="mx-1 btn btn-success"
                onClick={() => this.props.handleClose()}
              >
                تم
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Alert;
