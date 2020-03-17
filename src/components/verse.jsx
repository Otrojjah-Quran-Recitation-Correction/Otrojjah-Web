import React, { Component } from "react";
import { Link } from "react-router-dom";
import VersesTable from "./versesTable";
import { getVerses, deleteVerse } from "../services/versesServices";

class Verse extends Component {
  state = {
    verses: []
  };

  async componentDidUpdate() {
    const ruleId = this.props.ruleId;
    const { data: verses } = await getVerses(ruleId);
    this.setState({ verses });
  }

  handleDelete = async verse => {
    const verses = this.state.verses.filter(e => e._id !== verse._id);
    const jwt = this.props.jwt;
    this.setState({ verses });
    await deleteVerse(verse, jwt);
  };

  render() {
    return (
      <div>
        <Link to={`/addVerse/${this.props.ruleId}`}>
          <button className="my-2 btn btn-warning">Add Verse</button>
        </Link>
        <VersesTable
          handleDelete={this.handleDelete}
          verses={this.state.verses}
        ></VersesTable>
      </div>
    );
  }
}

export default Verse;
