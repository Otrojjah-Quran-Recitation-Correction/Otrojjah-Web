import React, { Component } from "react";
import Mic from "./mic";

class Home extends Component {
  state = {
    records: [],
    record: { verseId: "5e6d3c353fac71001710ec3c", filePath: "" }
  };

  async componentDidMount() {}

  render() {
    const { verseId, filePath } = this.state.record;
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
              <audio className="Audio" src={filePath} controls></audio>
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
