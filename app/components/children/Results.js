import React from "react";

// Helper Function
import helpers from "../utils/helpers";

class Results extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          ArticlesFound: []
      };
      this.btnClick = this.btnClick.bind(this);
  }

    // setSaved(saved){
    //     this.setState({searchSaved: saved });
    // }

    btnClick(event){
      console.log(`In btnClick`);
      console.log("Save button clicked ", event.target.value);
      console.log("article ", this.state.ArticlesFound[event.target.value]);

      helpers.postArticle(this.state.ArticlesFound[event.target.value]).then(function(response) {
          console.log(`after posted Article`);
          console.log(response);

          // After we've done the post... then get the updated articles
          helpers.getSavedArticles().then(function(response) {

              console.log("Articles in DB-results", response.data);

              this.setState({ saved: response.data });

              console.log("this.state.saved btnClick: ", this.state.saved);


              // this.props.setSaved(this.state.saved);

              console.log("RESET this.props.saved btnClick: ", this.props.saved);

          }.bind(this));
      }.bind(this))
  }

    componentWillReceiveProps(nextProps) {
      console.log("componentWillReceiveProps in Results");
      console.log(`This componentWillReceiveProps inside in Results.js. `);
      if (this.props.results !== nextProps.results) {
            this.setState({
                ArticlesFound: nextProps.results
            })
      }
  }

  render() {

      console.log ("this.props.results: " + this.props.results);

      if(this.props.results == ""){
          console.log ("this.props.results: " + this.props.results);
          return (

              <div className="panel panel-default">
                  <div className="panel-heading">
                      <h5 className="panel-title text-center">Results</h5>
                  </div>
                  <div className="panel-body">
                      <h5 className="text-center panel-title">Search Results Not Found</h5>
                      <h5 className="text-center panel-title">Please Enter or Re-enter your search</h5>
                  </div>
              </div>
          )
      }

      return (
          <div className="panel panel-default">
                <div className="panel-heading">
                    <h5 className="panel-title text-center">Results</h5>
                </div>
                <div className="panel-body">
                {/* passing the clickedIndex for the helpers.articlePost  */}
                    {this.props.results.map ((foundArticle, clickedIndex) => {
                    return  (
                            <div className="articleItems" key={foundArticle.indexForKey}>
                                <a href={foundArticle.url} target="_blank">{foundArticle.headline}</a>
                                <button onClick={this.btnClick}
                                        className="btn btn-primary" value={clickedIndex}
                                >Save Article</button>
                                <br></br>
                        </div>
                    )
                    })}
                </div>
          </div>
    );
  }
}

// Export the component back for use in other files
export default Results;