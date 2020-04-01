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
      btnClass: "btn btn-info disabled normalcursor"
    };
  }

  startRecording = () => {
    const btnClass = "btn btn-info disabled normalcursor";
    this.setState({
      record: true,
      btnClass
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
    const blobUrl = URL.createObjectURL(recordedBlob.blob);
    const btnClass = "btn btn-info";
    this.setState({ recordedBlob, blobUrl, btnClass });
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
        const btnClass = "btn btn-info disabled normalcursor";
        recordedBlob = "";
        this.props.handleAlert();
        this.setState({ blobUrl, recordedBlob, btnClass });
      }
    }
  };

  render() {
    return (
      <div>
        <ReactMic
          record={this.state.record}
          className="block record"
          onStop={this.onStop}
          onData={this.onData}
          strokeColor="#010a15"
          mimeType="audio/wav"
          backgroundColor="#011224"
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

        <button onClick={this.saveRecord} className={this.state.btnClass}>
          تقييم
        </button>
      </div>
    );
  }
}
