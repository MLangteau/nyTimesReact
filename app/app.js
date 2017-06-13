// Include the Main React Dependencies
import React from "react";
import ReactDOM from "react-dom";

// Include the Main Component
import Main from "./components/Main";

// This code here allows us to render our main component (in this case "Main")
ReactDOM.render(<Main />, document.getElementById("app"));

// OR YOU CAN DO THIS
// const app = document.getElementById('app');
// ReactDOM.render(<Main/>, app);
