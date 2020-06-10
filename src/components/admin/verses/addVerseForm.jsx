import React from "react";
import Joi from "joi-browser";
import { addVerse } from "../../../services/versesServices";
import Form from "../../common/form";

class AddVerseForm extends Form {
  state = {
    data: {
      name: "",
      surah: ""
    },
    errors: {
      name: "",
      surah: ""
    },
    jwt: ""
  };
  schema = {
    name: Joi.string().required(),
    surah: Joi.string()
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    this.setState({ jwt });
  }
  doSubmit = async () => {
    const jwt = this.state.jwt;
    const data = { ...this.state.data };
    data.ruleId = this.props.match.params.id;
    const err = await addVerse(data, jwt);
    if (!err) {
      this.props.history.goBack();
    }
  };

  render() {
    return (
      <div>
        <div className="container rule mb-5 bt-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 my-5">
              <form
                className="text-center p-4  m-auto"
                onSubmit={this.handleSubmit}
              >
                <h1 className="mb-5">Add Verse</h1>
                {this.renderInput("name", "VerseName")}
                {this.renderInput("surah", "Surah")}
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

export default AddVerseForm;
