import express from "express";
import path from "path";
const http = require("http");
const socketIo = require("socket.io");

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

//app.listen(port, () => console.log(`🚀 Server is listening on port ${port}.`));
server.listen(port, () => console.log(`🚀 Listening on port ${port}`));

io.on("connection", socket => {
    console.log(`New client connected ${socket.id}`);
    socket.join("basic");
    socket.on("disconnect", () => console.log("Client disconnected"));
    socket.on("newMessage", receve => {
        console.log(receve);
        socket.emit("newMessage", receve);
        socket.to("basic").emit("newMessage", receve);
    });
});
