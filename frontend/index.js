import React from "react";
import ReactDOM from "react-dom";
import App from "./src/app.jsx";
import Context from "./src/models.js";

const store = window.store;
const context = new Context(store);

ReactDOM.render(<App context={context} />, document.getElementById("root"));
