import React, {useState} from "react";
import Form from "./utils/form";

const Game = props => {
    const [messages, setMessages] = useState([]);

    //recois un message
    props.socket.on("newMessage", data => {
        setMessages([data, ...messages]);
    });

    //envoie un message
    const sendChat = message => {
        props.socket.emit("newMessage", message);
    };

    return (
        <div>
            <h1>{"Hello, world! plop"}</h1>
            <Form sendChat={sendChat} />
            <hr />
            <ul>
                {messages.map((message, index) => (
                    <li key={`m${index + 1}`}>{message}</li>
                ))}
            </ul>
        </div>
    );
};

export default Game;
