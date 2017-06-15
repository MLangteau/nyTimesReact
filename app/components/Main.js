import React from "react";

// Import sub-components
import Form from "./children/Form";
import Results from "./children/Results";
import SavedArticles from "./children/SavedArticles";

// Helper Function
import helpers from "./utils/helpers";

class Main extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
        searchTopic: "",
        searchStartYear: "",
        results: {},
        saved: []
    };

    // this.setTopic = this.setTopic.bind(this);            // moved this bind into the div instead
    // this.setStartYear = this.setStartYear.bind(this);    // moved this bind into the div instead
  }

  componentDidUpdate(prevProps, prevState) {
//  New topic/search was entered
    if (prevState.searchTopic !== this.state.searchTopic) {
        console.log("Search was Entered");
        this.setState({results: []});  //  must be set here, to show results is an array of objects.

      // helpers.runQuery(this.state.searchTopic, this.state.searchStartYear).then(data => {
        helpers.runQuery(this.state.searchTopic, this.state.searchStartYear).then(function(data){
        if (data !== this.state.results) {
            console.log("FOR EYE this.state.searchNumRecords: " + parseInt(this.state.searchNumRecords));
            for (var i = 0; i < parseInt(this.state.searchNumRecords); i++) {
                console.log("inside i: " + i);

  var eachResult = {headline: data[i].headline.main, pubdate:data[i].pub_date, sectionname: data[i].section_name, url:data[i].web_url};

                console.log(`headline: ${data[i].headline.main}`);
                console.log(`pubdate: ${data[i].pub_date}`);
                console.log(`sectionname: ${data[i].section_name}`);
                console.log(`url: ${data[i].web_url}`);

                console.log("eachResult: " + eachResult);

                this.setState({results: this.state.results.concat(eachResult)});
                console.log("after populate - this.state.results: " + this.state.results);
                console.log(`*** populate - this.state.results[i]: ${this.state.results[i]}`);
                // console.log(`after populate - this.state.results[i]: " + ${this.state.results[${i}]}`);
            }
        }
      }.bind(this));
    }
  }

  setTopic(topic){
      this.setState({searchTopic: topic });
  }

  setNumRecords(numRecords){
      this.setState({searchNumRecords: numRecords});
  }

  setStartYear(startYear){
      this.setState({searchStartYear: startYear});
  }

  render() {

    return (

      <div className="container">
        <div className="row">


          <div className="col-md-6">

            <Form setTopic={this.setTopic.bind(this)} setStartYear={this.setStartYear.bind(this)} setNumRecords={this.setNumRecords.bind(this)}/>

          </div>

          <div className="col-md-6">

            {/*<Results results={this.state.results}  onClick={this.btnClick.bind(this)}/>*/}
              <Results results={this.state.results}/>

          </div>

            <div className="col-md-6">

                <SavedArticles saved={this.state.saved} />

            </div>

        </div>

      </div>
    );
  }
}

// Export the component back for use in other files
export default Main;
