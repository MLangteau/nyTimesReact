import React from "react";
// import {Link} from 'react-router';
// Use later import {Router, Route, IndexRoute, browserHistory, Link} from 'react-router';

// Import sub-components
import Header from "./children/Header";
import Form from "./children/Form";
import Results from "./children/Results";
import SavedArticles from "./children/SavedArticles";

//Include CSS
require('./css/main.css');

// Helper Function
import helpers from "./utils/helpers";

class Main extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            searchTopic: "",
            searchStartYear: "",
            results: [],
            saved: []
        };

        // this.setTopic = this.setTopic.bind(this);            // moved this bind into the div instead
        // this.setStartYear = this.setStartYear.bind(this);    // moved this bind into the div instead
    }

    // The moment the page renders the first time get the saved Articles from the database
    componentDidMount() {
        console.log("componentDidMount");
        // Get the last few saved Articles.
        helpers.getSavedArticles().then(function(response) {
            console.log(response);
            if (response !== this.state.saved) {
                console.log("Articles in DB-MAIN", response.data);
                this.setState({ saved: response.data });
            }
        }.bind(this));
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("componentDidUpdate");
//  New topic/search was entered
        if (prevState.searchTopic !== this.state.searchTopic) {
            console.log("Search was Entered");
            this.setState({results: []});  //  must be set here, to show results is an array of objects.

            helpers.runQuery(this.state.searchTopic, this.state.searchStartYear).then(function(data){
                if ((data !== this.state.results) && data !== "") {
                    console.log("FOR EYE this.state.searchNumRecords: " + parseInt(this.state.searchNumRecords));
                    var maxRecords = parseInt(this.state.searchNumRecords);
                    console.log("initial maxRecords: " + maxRecords);
                    // Checking the user input for the Number of Articles they would like to see (set to 5, if not 1-10)
                    if ((maxRecords >= 1)  &&  (maxRecords <= 10 )){
                        console.log("Number of Articles requested is between 1 and 10");
                        //  leave the number of records alone.
                    } else if (maxRecords > 10){
                        //  If they entered a number greater than 10, set the default to 10 Articles
                        maxRecords = 10;
                        console.log("Just RESET Number of Articles to: " + maxRecords);
                    }
                    else {
                        //  If not entered appropriately, they will be given 5 Articles
                        maxRecords = 5;
                        console.log("Just RESET Number of Articles to: " + maxRecords);
                    }
                    var dataArray = [];
                    for (var i = 0; i < maxRecords; i++) {
                        console.log("inside i: " + i);
                        var randomIndex = ((i+1) * ((Math.floor(Math.random() * 1000) + 1)));

                        var eachResult = {
                            indexForKey: randomIndex,
                            headline: data[i].headline.main,
                            pubDate:data[i].pub_date,
                            sectionName: data[i].section_name,
                            url:data[i].web_url};

                        console.log(`randomIndex: ${randomIndex}`);
                        console.log(`eachResult.indexForKey: ${eachResult.indexForKey}`);
                        console.log(`headline: ${data[i].headline.main}`);
                        console.log(`pubdate: ${data[i].pub_date}`);
                        console.log(`sectionName: ${data[i].section_name}`);
                        console.log(`url: ${data[i].web_url}`);
                        console.log("eachResult: ", eachResult);

                        dataArray.push(eachResult);
                    }
                    this.setState({results: dataArray});
                    console.log("ALL OF THE searched ARTICLES (NYTimes) !!", this.state.results);
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
                <Header /><br></br>
                {/*<div className="row">*/}

                    <div className="col-md-4">

                        <Form setTopic={this.setTopic.bind(this)} setStartYear={this.setStartYear.bind(this)} setNumRecords={this.setNumRecords.bind(this)}/>

                    </div>

                    <div className="col-md-4">

                        <Results results={this.state.results}/>

                    </div>

                    <div className="col-md-4">

                        <SavedArticles saved={this.state.saved} />

                    </div>

                {/*</div>*/}

            </div>
        );
    }
}

// Export the component back for use in other files
export default Main;