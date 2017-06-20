import React from "react";

// Helper Function
import helpers from "../utils/helpers";

class SavedArticles extends React.Component {

    constructor(props) {
        super(props);
        this.removeClick = this.removeClick.bind(this)

        // this.state = {
        //     searchSaved: []
        // };
    }

    componentWillUpdate(nextProps, nextState){
        console.log("componentWillUpdate - in Saved");
//  TOOK THIS OUT - was just trying this out
        // if (this.props.saved !== nextProps.saved) {
        //     this.setState({
        //         searchSaved: nextProps.saved
        //     })
        // }
        console.log("this.props.saved removeClick-WU: ", this.props.saved);
    }

    removeClick(event){
        console.log(`In removeSaved`);
        console.log("Remove button clicked ", event.target.value);
        // console.log("article ", this.state.ArticlesLeft[event.target.value]);
        console.log("article _id: ", event.target.value);

        helpers.removeArticle(event.target.value).then(function(response) {
            console.log(`after helpers.removeArticle`);
            console.log(response);

            // After we've done the remove, get the updated saved articles
            helpers.getSavedArticles().then(function(response) {

                console.log("Articles left in DB after delete", response.data);

                this.setState({ saved: response.data });

                console.log("this.state.saved removeClick: ", this.state.saved);

                // this.props.setSaved(this.state.saved);

                console.log("FIXED this.props.saved removeClick: ", this.props.saved);

            }.bind(this));

        }.bind(this))
    }

    render() {

        console.log ("this.props.saved in SavedArticles: " + this.props.saved);

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Saved Articles</h3>
                </div>
                <div className="panel-body">

                    {/* passing the id for the clicked article for the helpers.removeArticle */}
                    {this.props.saved.map (foundArticle => {
                        return  (
                            <div className="articleItems">
                            <div key={foundArticle._id}>
                            <a href={foundArticle.url}>{foundArticle.title}</a>
                            <button onClick={this.removeClick}
                            className="btn btn-danger" value={foundArticle._id}
                            >Remove Article</button>
                            <br></br>
                            </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

// Export the component back for use in other files
export default SavedArticles;