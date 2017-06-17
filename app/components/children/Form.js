import React from "react";

import Header from "./Header";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        topic: "",
        startYear: "",
        numRecords: ""
    };

    this.handleChange = this.handleChange.bind(this);  // both set here so we do not duplicate in render
    this.handleSubmit = this.handleSubmit.bind(this);
  }

//  handleChange listens for each keystroke
  handleChange(event) {

    var newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

//  handleSubmit listens for the submit button
  handleSubmit(event) {
    event.preventDefault();

    console.log("SUBMIT was done");

    console.log("this.state.topic: " + this.state.topic);
    console.log("this.state.startYear: " + this.state.startYear);
    console.log("this.state.numRecords: " + this.state.numRecords);

    this.props.setTopic(this.state.topic);
    this.props.setStartYear(this.state.startYear);
    this.props.setNumRecords(this.state.numRecords);

    this.setState({ topic: "" });
    this.setState({ startYear: "" });
    this.setState({ numRecords: "" });
  }

  render() {

    return (

      <div className="panel panel-default">
        {/*<div className="panel-heading">*/}
          {/*<h3 className="panel-title text-center">New York Times Articles Scrubber</h3>*/}
        {/*</div>*/}
        <Header />
        <div className="panel-body text-center">

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="panel-title text-center">
                <strong>Search for and Save Articles of Interest</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange event.
              */}
              <h4 className="panel-title text-center">
                <strong>Title</strong>
              </h4>
              <input
                type="text"
                className="form-control text-center"
                id="topic"
                value={this.state.topic}
                onChange={this.handleChange}
                required
              />
              <br />
              <h4 className="panel-title text-center">
                <strong>Number of Articles (1-10)</strong>
              </h4>
              <input
                  type="text"
                  className="form-control text-center"
                  id="numRecords"
                  value={this.state.numRecords}
                  onChange={this.handleChange}
                  required
              />
              <br />
              <h4 className="panel-title text-center">
                <strong>Start Year</strong>
              </h4>
              <input
                  type="text"
                  className="form-control text-center"
                  id="startYear"
                  value={this.state.startYear}
                  onChange={this.handleChange}
                  required
              />
              {/*<br />*/}
              {/*<h4 className="panel-title text-center">*/}
                {/*<strong>End Year</strong>*/}
              {/*</h4>*/}
              {/*<input*/}
                  {/*type="text"*/}
                  {/*className="form-control text-center"*/}
                  {/*id="endYear"*/}
                  {/*value={this.state.endYear}*/}
                  {/*onChange={this.handleChange}*/}
                  {/*required*/}
              {/*/>*/}
              <br />
              <br />

              <button
                type="searchBtn"
                className="btn btn-primary"
              >Search
              </button>

            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
