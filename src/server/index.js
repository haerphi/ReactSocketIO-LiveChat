import express from "express";
import path from "path";
import {validate, deleteFromTab} from "./utils/utils";
const http = require("http");
const socketIo = require("socket.io");

//tab of object{name, id}
const tabPerson = [];

//port for the app
const {APP_PORT, PORT} = process.env;
const port = APP_PORT || PORT || 4001;

const app = express();

const server = http.createServer(app);
const io = socketIo(server); // < Interesting!

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

app.get("/:anything", (req, res) => {
    console.log(`ℹ️  (${req.method.toUpperCase()}) ${req.url}`);
    res.send(`404 : /${req.params.anything} doesn't exit`);
});

//start server
server.listen(port, () => console.log(`🚀 Listening on port ${port}`));

//SocketIO event
io.on("connection", socket => {
    console.log(`New client connected ${socket.id}`);
    //conect to the basic channel
    socket.join("basic");
    //disconnect
    socket.on("disconnect", () => {
        console.log("Client disconnected");
        //delete from the tab
        if (deleteFromTab(tabPerson, socket.id)) {
            console.log("Sucessfully deleted");
        } else {
            console.log("Was he in the tab ? I hope he wasn't...");
        }
        console.log(tabPerson);
    });
    //receved a nickname
    socket.on("nickname", receve => {
        setTimeout(() => {
            //does already have this name ?
            if (validate(tabPerson, receve)) {
                //Nice a newbe !
                tabPerson.push({name: receve, id: socket.id});
                console.log(`Validate ${receve}`);
                socket.emit("nickname", receve);
                socket.to("basic").emit("joined", receve);
            } else {
                //already exist or named "error"
                console.log(`Reject ${receve}`);
                socket.emit("nickname", "error");
            }
        }, 2000);
    });
    //receved a new message
    socket.on("newMessage", receve => {
        console.log(receve);
        socket.emit("newMessage", receve);
        socket.to("basic").emit("newMessage", receve);
    });
});
