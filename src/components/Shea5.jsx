import React, { Component } from "react";
import SideBar from "./SideBar";

class Shea5 extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <SideBar></SideBar>
          <div className="container col-10">
            <audio controls style={{ display: "block" }}>
              <source
                src="./audio/Abdul_Basit_Mujawwad_128kbps.111000.mp3"
                type="audio/mpeg"
              />
            </audio>
            <button className="mt-1 mr-2 btn btn-primary btn-sm">true</button>
            <button className="mt-1 btn btn-danger btn-sm">false</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Shea5;
