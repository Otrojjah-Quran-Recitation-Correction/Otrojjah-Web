import { ReactMic } from "react-mic";
import React, { Component } from "react";
import { addClient } from "../services/clientsServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";

export default class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blobUrl: ""
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
    //console.log("chunk of real-time data is: ", recordedBlob);
  }

  onStop = recordedBlob => {
    const data = new FormData();
    const { hokm, ayah } = this.props;
    data.append("record", recordedBlob.blob);
    data.append("recordName", "ahmed123456");
    data.append("ayah", ayah);
    data.append("hokm", hokm);
    //const blobUrl = URL.createObjectURL(recordedBlob.blob);
    const blobUrl = recordedBlob.blob;
    addClient(data);
    this.setState({ blobUrl });
  };

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="block record"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#fff"
          mimeType="audio/wav"
          backgroundColor="#000"
        />

        <form encType="multipart/form-data" method="post" action="#" id="#">
          <FontAwesomeIcon
            className="ml-2 recordicon"
            onClick={this.startRecording}
            icon={faMicrophone}
          />
          <FontAwesomeIcon
            className="ml-2 recordicon"
            onClick={this.stopRecording}
            icon={faStopCircle}
          />
        </form>
        <audio
          className="Audio recordAudio"
          controls
          src={this.state.blobUrl}
        ></audio>
      </div>
    );
  }
}
