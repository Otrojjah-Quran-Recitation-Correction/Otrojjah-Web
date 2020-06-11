import { ReactMic } from "react-mic";
import React, { Component } from "react";
import { addRecord } from "../services/recordsServices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";

export default class Mic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blobUrl: "",
      recordedBlob: "",
      btnClass: "result_btn disabled_btn normalcursor",
      startIconClass: "",
      stopIconClass: "disabled_icon"
    };
  }

  startRecording = () => {
    const jwt = localStorage.getItem("token");
    if (!jwt) window.location = "/login";
    else {
      const btnClass = "result_btn disabled_btn normalcursor";
      const startIconClass = "active_icon";
      const stopIconClass = "";
      this.setState({
        record: true,
        btnClass,
        startIconClass,
        stopIconClass
      });
    }
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
    const blobUrl = URL.createObjectURL(recordedBlob.blob);
    const btnClass = "result_btn";
    const startIconClass = "";
    const stopIconClass = "disabled_icon";
    this.setState({
      recordedBlob,
      blobUrl,
      btnClass,
      startIconClass,
      stopIconClass
    });
  };

  saveRecord = async () => {
    let recordedBlob = this.state.recordedBlob;
    if (recordedBlob) {
      const { verseId } = this.props;
      const name = `record-${Date.now()}.wav`;
      const data = new FormData();
      data.append("label", name);
      data.append("verseId", verseId);
      data.append("record", recordedBlob.blob);
      data.append("isShaikh", false);
      const err = await addRecord(data);
      if (!err) {
        const blobUrl = "";
        const btnClass = "result_btn disabled_btn normalcursor";
        recordedBlob = "";
        this.props.handleAlert();
        this.setState({ blobUrl, recordedBlob, btnClass });
      }
    }
  };

  render() {
    return (
      <div className="my-5">
        <ReactMic
          record={this.state.record}
          className="displayNone"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#010a15"
          mimeType="audio/wav"
          backgroundColor="#233a48"
        />

        <form
          encType="multipart/form-data"
          method="post"
          action="#"
          id="#"
          style={{ border: "none" }}
        >
          <FontAwesomeIcon
            className={`ml-3 recordicon ${this.state.startIconClass}`}
            onClick={this.startRecording}
            icon={faMicrophone}
          />
          <FontAwesomeIcon
            className={`ml-3 recordicon ${this.state.stopIconClass}`}
            onClick={this.stopRecording}
            icon={faStopCircle}
          />
        </form>
        <audio
          className="Audio recordAudio mt-3"
          controls
          src={this.state.blobUrl}
        ></audio>

        <button onClick={this.saveRecord} className={this.state.btnClass}>
          تقييم
        </button>
      </div>
    );
  }
}
