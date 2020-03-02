import React, { Component } from "react";
import { getRandomClient, updateLabel } from "../services/labelServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import http from "../services/httpServices";

class Label extends Component {
  state = {
    client: {
      recordName: "",
      ayah: "",
      hokm: "",
      link: ""
    },
    jwt: "",
    file: "",
    blobUrl: ""
  };

  b64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || "image/png";
    sliceSize = sliceSize || 512;

    var byteCharacters = b64Data;
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }
    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  async componentDidMount() {
    const { data: client } = await getRandomClient();
    const jwt = localStorage.getItem("token");

    // fetch("http://localhost:5000/image/c69e565930adc90d9a7c82c14e7b1121", {
    //   method: "GET"
    // })
    //   .then(re => re.blob())
    //   .then(blob => URL.createObjectURL(blob))
    //   .then(blobUrl => this.setState({ blobUrl }));

    this.setState({ jwt, client });
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
