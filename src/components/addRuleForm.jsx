import React from "react";
import Joi from "joi-browser";
import { addRule } from "../services/rulesServices";
import Form from "./common/form";

class AddRuleForm extends Form {
  state = {
    data: {
      name: "",
      description: ""
    },
    errors: {
      name: "",
      description: ""
    },
    jwt: ""
  };
  schema = {
    name: Joi.string().required(),
    description: Joi.string()
  };

  componentDidMount() {
    const jwt = localStorage.getItem("token");
    this.setState({ jwt });
  }

  doSubmit = async () => {
    const jwt = this.state.jwt;
    const data = { ...this.state.data };
    data.parentId = this.props.match.params.id;

    const err = await addRule(data, jwt);
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
              <h1>Add Rule</h1>
              <form onSubmit={this.handleSubmit}>
                {this.renderInput("name", "RuleName")}
                {this.renderTextArea("description", "Description")}
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

export default AddRuleForm;
