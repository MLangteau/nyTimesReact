import React from "react";

class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body">
          {/*{this.props.results.map((foundArticle, parseInt(this.state.searchNumRecords) => {*/}
          {/*{this.props.results.map(function(foundArticle, i){*/}
          {this.props.results.map (foundArticle => {
             return  (
                 <div key={foundArticle.headline}> <a href={foundArticle.url}>{foundArticle.sectionname}{foundArticle.headline}</a>
                    <button type="saveBtn" className="btn btn-primary">Save</button>
                </div>
            )
          }
              )}
        </div>
      </div>
    );
  }
}

// Export the component back for use in other files
export default Results;
