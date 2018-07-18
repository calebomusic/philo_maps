import React from "react";
import ReactDOM from "react-dom";
import App from "./src/app.jsx";

const store = window.store;

console.log(store)
ReactDOM.render(<App store={store} />, document.getElementById("root"));
