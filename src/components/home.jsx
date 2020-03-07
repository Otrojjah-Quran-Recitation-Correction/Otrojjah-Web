import React, { Component } from "react";
import Mic from "./mic";
import { getShaikhRecords } from "../services/shaikhRecordsServices";

class Home extends Component {
  state = {
    records: [],
    record: {
      hokm: "",
      ayah: "",
      link: ""
    }
  };

  async componentDidMount() {
    const { data: records } = await getShaikhRecords();
    const randomNum = Math.floor(Math.random() * records.length);
    const record = records[randomNum];
    this.setState({ records, record });
  }

  render() {
    const { hokm, ayah, link } = this.state.record;
    return (
      <React.Fragment>
        <div className="py-5"></div>
        <main className="mainComponent container my-5 py-5">
          <div className="row">
            <div className="col-2"></div>
            <div className="col-8 text-center">
              <div>
                <h3>حكم:{hokm}</h3>
                <h3>اية :{ayah}</h3>
              </div>
              <audio className="Audio" src={link} controls></audio>
              <Mic hokm={hokm} ayah={ayah}></Mic>
            </div>
            <div className="col-2"></div>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default Home;
