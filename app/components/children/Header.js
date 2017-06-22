import React from "react";

// Import CSS
require('../css/header.css');

class Header extends React.Component {

    render() {
        return (
            <div className="myHeader">
                <br>
                    <h1 className="text-center">New York Times Articles Scrubber!</h1>
                    <h3><marquee behavior="alternate" scrollamount="3">Enter Your Search Criteria On the Left</marquee></h3>
                </br>
            </div>
        );
    }
}

// Export the component back for use in other files
export default Header;
