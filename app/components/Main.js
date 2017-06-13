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
        searchTerm: "",
        results: [],
        saved: []
    };

    this.setTerm = this.setTerm.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.searchTerm !== this.state.searchTerm) {
      console.log("UPDATED");

      helpers.runQuery(this.state.searchTerm).then((data) => {
        if (data !== this.state.results) {
          console.log(data);

          this.setState({ results: data });
        }
      });
    }
  }

  setTerm(topic){
    this.setState({
        searchTerm: topic
    });
  }

  render() {

    return (

      <div className="container">
        <div className="row">


          <div className="col-md-6">

            <Form setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results resultsArea={this.state.results} />

          </div>

            <div className="col-md-6">

                <SavedArticles savedArea={this.state.saved} />

            </div>

        </div>

      </div>
    );
  }
}

// Export the componen back for use in other files
export default Main;
