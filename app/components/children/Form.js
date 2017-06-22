import React from "react";

// Import CSS
// import "../css/form.css";
require('../css/form.css');

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
    console.log(`event.target.value: ${event.target.value}`);

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
        <div className="panel panel-default smPans">
            <div className="panel-heading savedRes">
              <h4 className="panel-title text-center">Search for and Save Articles of Interest</h4>
            </div>

            <div className="panel-body text-center wordsPanel">

              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    {/*<div className="searchPanel">*/}
                      {/*<h4 className="panel-title text-center">*/}
                        {/*<strong>Search for and Save Articles of Interest</strong>*/}
                      {/*</h4>*/}
                        {/*<br></br>*/}
                    {/*</div>*/}
                  {/*
                    Note how each of the form elements has an id that matches the state.
                    This is not necessary but it is convenient.
                    Also note how each has an onChange event associated with our handleChange event.
                  */}
                  <h4 className="text-center">
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
                  <h4 className="text-center">
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
                  <h4 className="text-center">
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
                  {/*<h4 className="text-center">*/}
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

                  <button className="btn btn-primary btnHover">Search
                  </button>

                </div>
              </form>
            </div>
        </div>
    );
  }
}

export default Form;
