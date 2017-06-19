import React from "react";

// Helper Function
import helpers from "../utils/helpers";

class SavedArticles extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ArticlesLeft: []
        };

    }

    removeSaved(event){
        console.log(`In removeSaved`);
        console.log("Remove button clicked ", event.target.value);
        // console.log("article ", this.state.ArticlesLeft[event.target.value]);
        console.log("article _id: ", event.target.value);

        helpers.removeArticle(event.target.value).then(function(response) {
            console.log(`after helpers.removeArticle`);
            console.log(response);

            // After we've done the remove, get the updated article list
            helpers.getSavedArticles().then(function(response) {

                console.log("Articles left in DB after delete", response.data);

                this.setState({ saved: response.data });

            }.bind(this));

        }.bind(this))
    }

    componentWillReceiveProps(nextProps) {
        console.log(`This componentWillReceiveProps inside in SavedArticles.js. `);
        this.setState({
            ArticlesLeft: nextProps.saved
        });
        console.log("this.state.ArticlesLeft: ", this.state.ArticlesLeft);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Saved Articles</h3>
                </div>
                <div className="panel-body">

                    {/* passing the clickedIndex for the helpers.articleRemove - may not be created yet */}
                    {this.props.saved.map (foundArticle => {
                        return  (
                            <div className="articleItems">
                                    <div key={foundArticle._id}>
                                        <a href={foundArticle.url}>{foundArticle.title}</a>
                                        <button onClick={this.removeSaved.bind(this)}
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