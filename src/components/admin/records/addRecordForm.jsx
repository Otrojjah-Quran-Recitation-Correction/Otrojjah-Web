import React from "react";
import Joi from "joi-browser";
import { addRecord } from "../../../services/recordsServices";
import Form from "../../common/form";

class AddRecordForm extends Form {
  state = {
    data: {
      label: ""
    },
    errors: {
      label: ""
    },
    jwt: "",
    record: ""
  };
  schema = {
    label: Joi.string().required(),
    record: Joi.required()
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    this.setState({ jwt });
  }

  doSubmit = async () => {
    const jwt = this.state.jwt;
    const record = { ...this.state.data };
    const data = new FormData();
    data.append("label", record.label);
    data.append("verseId", this.props.match.params.id);
    for (let i = 0; i < this.state.record.length; i++)
      data.append("record", this.state.record[i]);
    data.append("isShaikh", true);
    const err = await addRecord(data, jwt);
    if (!err) {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <div className=" py-5">
        <div className="container mainComponent my-5 bt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 my-5">
              <h1>Add Record</h1>
              <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                {this.renderInput("label", "Label")}
                {this.renderInput("record", "Record", "file")}
                {this.renderButton("Add")}
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddRecordForm;
