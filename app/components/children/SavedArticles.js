import React from "react";

class SavedArticles extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title text-center">Saved Articles</h3>
                </div>
                <div className="panel-body">

                    {this.props.savedArea} <button type="removeBtn" className="btn btn-primary">Remove</button>

                </div>
            </div>
        );
    }
}

// Export the component back for use in other files
export default SavedArticles;