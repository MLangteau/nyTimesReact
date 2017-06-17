import React from "react";

class SavedArticles extends React.Component {

    constructor(props) {
        super(props);
    }

    removeSaved(event){
        console.log(`In removeSaved`);
        console.log("Remove button clicked ", event.target.value);
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
                                        {/*<button onClick={this.removeSaved.bind(this)}*/}
                                        <button  className="btn btn-danger" value={foundArticle._id}
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