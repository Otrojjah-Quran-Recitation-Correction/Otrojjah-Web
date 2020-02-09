import { ReactMic } from "react-mic";
import React, { Component } from "react";
import http from "../services/httpServices";

export default class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      client: {
        recordName: "",
        ayah: "",
        hokm: "",
        record: ""
      }
    };
  }

  startRecording = () => {
    this.setState({
      record: true
    });
  };

  stopRecording = () => {
    this.setState({
      record: false
    });
  };

  onData(recordedBlob) {
    console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop(recordedBlob) {
    const data = new FormData();
    data.append("record", recordedBlob.blob);
    data.append("recordName", "ahmed");
    data.append("ayah", "naran_thaat");
    data.append("hokm", "Ekhfaa");

    http.post("http://localhost:3001/api/client", data);
  }

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="sound-wave block"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#000000"
          mimeType="audio/wav"
          backgroundColor="#FF4081"
        />
        <button onClick={this.startRecording} type="button">
          Start
        </button>
        <form encType="multipart/form-data" method="post" action="#" id="#">
          <button onClick={this.stopRecording} type="button">
            Stop
          </button>
        </form>
      </div>
    );
  }
}
