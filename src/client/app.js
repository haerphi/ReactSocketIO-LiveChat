import * as React from "react";
import ReactDOM from "react-dom";

import Game from "./components/Game";

import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://127.0.0.1");

ReactDOM.render(<Game socket={socket} />, document.querySelector("#app"));