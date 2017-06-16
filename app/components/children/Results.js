import React from "react";

class Results extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

      console.log ("this.props.results: " + this.props.results);

      if(this.props.results == ""){
          console.log ("this.props.results: " + this.props.results);
          return (

              <div className="panel panel-default">
                  <div className="panel-heading">
                      <h3 className="panel-title text-center">Results</h3>
                  </div>
                  <div className="panel-body">
                      <h3 className="text-center panel-title">Search Results - Not Found</h3>
                      <h3 className="text-center panel-title">Please Enter or Re-enter your search</h3>
                  </div>
              </div>
          )
      }

      return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Results</h3>
        </div>
        <div className="panel-body">
            {/* since we limit the number of articles, this just looks for the props and passes the foundArticles */}
          {this.props.results.map (foundArticle => {
             return  (
                 <div className="articleItems" key={foundArticle.headline}> <a href={foundArticle.url}>{foundArticle.headline}</a>
              {/*<button onClick=???? type="saveBtn" className="btn btn-primary">Save</button>*/}
              <br></br>
               <button type="saveBtn" className="btn btn-primary">Save</button>

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
