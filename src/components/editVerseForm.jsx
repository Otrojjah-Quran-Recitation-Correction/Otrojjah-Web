import React from "react";
import Joi from "joi-browser";
import { updateVerse, getVerse } from "../services/versesServices";
import Form from "./common/form";

class EditVerseForm extends Form {
  state = {
    data: {
      name: "",
      surah: ""
    },
    errors: {
      name: "",
      surah: ""
    },
    jwt: "",
    ruleId: ""
  };
  schema = {
    name: Joi.string().required(),
    surah: Joi.string()
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data } = await getVerse(this.props.match.params.id);
    const newVerse = {
      name: data[0].name,
      surah: data[0].surah
    };
    const ruleId = data[0].ruleId;
    this.setState({ data: newVerse, jwt, ruleId });
  }

  doSubmit = async () => {
    const jwt = this.state.jwt;
    const data = { ...this.state.data };
    data.ruleId = this.state.ruleId;
    const err = await updateVerse(data, this.props.match.params.id, jwt);
    if (!err) {
      window.location = "/adminPanel";
    }
  };

  render() {
    return (
      <div className=" py-5">
        <div className="container mainComponent my-5 bt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 my-5">
              <h1>Edit Verse</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "VerseName")}
                {this.renderInput("surah", "Surah")}
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

export default EditVerseForm;
