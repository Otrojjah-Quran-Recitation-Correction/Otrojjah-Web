import React, { Component } from "react";
import Mic from "./mic";
import { getRandomRecord } from "../services/recordsServices";

class Home extends Component {
  state = {
    record: {},
    jwt: ""
  };

  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const { data: record } = await getRandomRecord("shaikh", jwt);
    this.setState({ jwt, record });
  }

  render() {
    const { fileURL, name, verseId } = this.state.record;
    return (
      <React.Fragment>
        <div className="py-5"></div>
        <main className="mainComponent container my-5 py-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 text-center">
              <div>
                <h3>حكم:</h3>
                <h3>اية :</h3>
              </div>
              <audio
                title={name}
                className="Audio"
                src={fileURL}
                controls
              ></audio>
              <Mic verseId={verseId}></Mic>
            </div>
            <div className="col-2"></div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
