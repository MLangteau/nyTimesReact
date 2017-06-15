import React from "react";

class Header extends React.Component {

    render() {
        return (
                <div className="panel-heading">
                    <h3 className="panel-title text-center">New York Times Articles Scrubber</h3>
                </div>
        );
    }
}

// Export the component back for use in other files
export default Header;
