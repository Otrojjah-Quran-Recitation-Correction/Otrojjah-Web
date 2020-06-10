import React from "react";
import Joi from "joi-browser";
import { updateRule, getRule } from "../../../services/rulesServices";
import Form from "../../common/form";

class EditRuleForm extends Form {
  state = {
    data: {
      name: "",
      description: ""
    },
    errors: {
      name: "",
      description: ""
    },
    jwt: "",
    parentId: ""
  };
  schema = {
    name: Joi.string().required(),
    description: Joi.string()
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data } = await getRule(this.props.match.params.id);
    const newRule = {
      name: data[0].name,
      description: data[0].description
    };
    const parentId = data[0].parentId;
    this.setState({ data: newRule, jwt, parentId });
  }

  doSubmit = async () => {
    const jwt = this.state.jwt;
    const data = { ...this.state.data };
    data.parentId = this.state.parentId;
    const err = await updateRule(data, this.props.match.params.id, jwt);
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
                <h1 className="mb-5">Edit Rule</h1>
                {this.renderInput("name", "RuleName")}
                {this.renderTextArea("description", "Description")}
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

export default EditRuleForm;
