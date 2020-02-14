import React, { Component } from "react";
import SideBar from "./sideBar";
import { getRandomClient, updateLabel } from "../services/labelServices";

class Label extends Component {
  state = {
    client: {
      recordName: "",
      ayah: "",
      hokm: "",
      link: ""
    }
  };

  async componentDidMount() {
    const { data: client } = await getRandomClient();
    this.setState({ client });
  }

  handleTrue = async () => {
    const client = { ...this.state.client };
    client.correct = true;
    const err = await updateLabel(client, client._id);
    if (!err) {
      window.location = "/label";
    }
  };

  handleFalse = async () => {
    const client = { ...this.state.client };
    client.correct = false;
    const err = await updateLabel(client, client._id);
    if (!err) {
      window.location = "/label";
    }
  };
  //audio not working
  render() {
    const { ayah, hokm, link } = this.state.client;
    return (
      <React.Fragment>
        <div className="row">
          <SideBar></SideBar>
          {this.state.client && (
            <div className="container col-10">
              <h5>Hokm:{hokm}</h5>
              <h5>Ayah:{ayah}</h5>
              {link && (
                <div>
                  <audio controls style={{ display: "block" }}>
                    <source src={link} type="audio/wav" />
                  </audio>
                </div>
              )}
              <form onSubmit={this.handleTrue}>
                <button className="mt-1 mr-2 btn btn-primary btn-sm">
                  true
                </button>
              </form>
              <form onSubmit={this.handleFalse}>
                <button className="mt-1 btn btn-danger btn-sm">false</button>
              </form>
            </div>
          )}
          {!this.state.client && <h1>There is no records to be labeled</h1>}
        </div>
      </React.Fragment>
    );
  }
}

export default Label;
