import React from "react";
import ReactDOM from "react-dom"; // Importación sin "/client"
import App from "./App";

const container = document.getElementById("root");
ReactDOM.render(<App />, container); // Usando render() en lugar de createRoot
