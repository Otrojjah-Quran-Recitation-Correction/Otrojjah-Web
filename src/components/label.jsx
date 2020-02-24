import React, { Component } from "react";
import { getRandomClient, updateLabel } from "../services/labelServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

class Label extends Component {
  state = {
    client: {
      recordName: "",
      ayah: "",
      hokm: "",
      link: ""
    },
    jwt: ""
  };

  async componentDidMount() {
    const { data: client } = await getRandomClient();
    const jwt = localStorage.getItem("token");
    this.setState({ client, jwt });
  }

  handleTrue = async () => {
    const client = { ...this.state.client };
    const jwt = this.state.jwt;
    client.correct = true;
    const err = await updateLabel(client, client._id, jwt);
    if (!err) {
      window.location = "/label";
    }
  };

  handleFalse = async () => {
    const client = { ...this.state.client };
    const jwt = this.state.jwt;
    client.correct = false;
    const err = await updateLabel(client, client._id, jwt);
    if (!err) {
      window.location = "/label";
    }
  };

  render() {
    const { ayah, hokm, link, recordName } = this.state.client;
    return (
      <React.Fragment>
        <div className="container my-5 pt-5">
          {this.state.client && (
            <div className="row  pt-5">
              <div className="col"></div>
              <div className="col label">
                <div className="text-center mb-5">
                  <h5>الحكم:{hokm}</h5>
                  <h5>الاية:{ayah}</h5>
                </div>
                <audio
                  title={recordName}
                  className="Audio mt-3"
                  controls
                  style={{ display: "block" }}
                  src={link}
                ></audio>
                <div className="container my-2">
                  <div className="row">
                    <FontAwesomeIcon
                      className="labelicon ml-1 btn btn-success col"
                      onClick={this.handleTrue}
                      icon={faCheck}
                    />

                    <FontAwesomeIcon
                      className="labelicon mr-1 btn btn-danger col"
                      onClick={this.handleFalse}
                      icon={faTimes}
                    />
                  </div>
                </div>
              </div>
              <div className="col"></div>
            </div>
          )}
          {!this.state.client && (
            <h1 className="text-center py-5">
              لا يوجد تسجيلات الان ليتم تقييمها!
            </h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Label;
