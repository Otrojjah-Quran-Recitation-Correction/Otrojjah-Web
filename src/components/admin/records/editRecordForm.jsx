import React from "react";
import Joi from "joi-browser";
import { updateRecord, getRecord } from "../../../services/recordsServices";
import Form from "../../common/form";

class EditRecordForm extends Form {
  state = {
    data: {
      label: ""
    },
    errors: {
      label: ""
    },
    jwt: "",
    verseId: ""
  };
  schema = {
    label: Joi.string().required()
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data } = await getRecord(this.props.match.params.id);
    const newRecord = {
      label: data[0].label
    };
    const verseId = data[0].verseId;
    this.setState({ data: newRecord, jwt, verseId });
  }

  doSubmit = async () => {
    const jwt = this.state.jwt;
    const data = { ...this.state.data };
    data.verseId = this.state.verseId;
    const err = await updateRecord(data, this.props.match.params.id, jwt);
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
              <h1>Edit Record</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("label", "Label")}
                {this.renderButton("Edit")}
              </form>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditRecordForm;
