import React, { Component } from "react";
import { Link } from "react-router-dom";
import VersesTable from "./versesTable";
import { getVerses, deleteVerse } from "../services/versesServices";
import _ from "lodash";

class Verse extends Component {
  state = {
    verses: [],
    sortColumn: { path: "name", order: "asc" }
  };

  async componentDidUpdate(prevProps, prevState) {
    const ruleId = this.props.ruleId;
    if (!prevState.verses[0]) {
      const { data: verses } = await getVerses(ruleId);
      this.setState({ verses });
    }
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getSortedData = () => {
    const { verses: data, sortColumn } = this.state;
    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    return { data: sorted };
  };

  handleDelete = async verse => {
    const verses = this.state.verses.filter(e => e._id !== verse._id);
    const jwt = this.props.jwt;
    this.setState({ verses });
    await deleteVerse(verse, jwt);
  };

  render() {
    const { sortColumn } = this.state;
    const { data: verses } = this.getSortedData();
    return (
      <div>
        <Link to={`/addVerse/${this.props.ruleId}`}>
          <button className="my-2 btn btn-warning">Add Verse</button>
        </Link>
        <VersesTable
          sortColumn={sortColumn}
          onSort={this.handleSort}
          handleDelete={this.handleDelete}
          verses={verses}
        ></VersesTable>
      </div>
    );
  }
}

export default Verse;
