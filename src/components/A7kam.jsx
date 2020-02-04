import React, { Component } from "react";
import SideBar from "./SideBar";
import Mic from "./Mic";
import ReactPlayer from "react-player";

class A7kam extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <SideBar></SideBar>
          <div className="accordion col-10" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Collapsible Group Item #1
                  </button>
                </h2>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  <audio controls>
                    <source
                      src="https://docs.google.com/uc?export=download&id=12qmkQtz-Fojjl0zUgYkT_1cCUI5hhZy4"
                      type="audio/mpeg"
                    />
                  </audio>
                  <Mic></Mic>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Collapsible Group Item #2
                  </button>
                </h2>
              </div>
              <div
                id="collapseTwo"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  <audio controls>
                    <source
                      src="./audio/Abdul_Basit_Mujawwad_128kbps.111000.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button
                    className="btn btn-link collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Collapsible Group Item #3
                  </button>
                </h2>
              </div>
              <div
                id="collapseThree"
                className="collapse"
                aria-labelledby="headingThree"
                data-parent="#accordionExample"
              >
                <div className="card-body">
                  <audio controls>
                    <source
                      src="./audio/Abdul_Basit_Mujawwad_128kbps.111000.mp3"
                      type="audio/mpeg"
                    />
                  </audio>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default A7kam;
