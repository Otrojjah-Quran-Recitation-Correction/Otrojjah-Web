import React, { Component } from "react";
import Verse from "./verse";
import Alert from "../../common/alert";

class ShowVerses extends Component {
  state = { jwt: "", ruleId: "", labelAlert: "", deleteVerse: false };

  async componentDidMount() {
    const ruleId = this.props.match.params.id;
    const jwt = localStorage.getItem("token");
    this.setState({ jwt, ruleId });
  }

  handleAlert = verse => {
    const labelAlert = verse;
    this.setState({ labelAlert });
  };

  handleVerseDelete = async () => {
    const deleteVerse = true;
    this.setState({ deleteVerse });
  };

  handleClose = () => {
    const labelAlert = "";
    this.setState({ labelAlert });
  };

  render() {
    const { jwt, ruleId, labelAlert, deleteVerse } = this.state;
    return (
      <React.Fragment>
        {labelAlert && (
          <Alert
            label={labelAlert}
            handleClose={this.handleClose}
            handleAccept={this.handleVerseDelete}
          ></Alert>
        )}
        <div className="py-5">
          <div className="mainComponent container my-5 py-5">
            <Verse
              deleteVerse={deleteVerse}
              verse={labelAlert}
              handleAlert={this.handleAlert}
              jwt={jwt}
              ruleId={ruleId}
            ></Verse>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ShowVerses;
