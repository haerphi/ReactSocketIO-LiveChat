import React, {useState} from "react";
import Nickname from "./nickname";
import Chat from "./chat";
import Loading from "./loading";

const Game = props => {
    const [messages, setMessages] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [showModalNickname, setShowModalNickname] = useState(true);
    const [showLoading, setShowLoading] = useState(false);
    const [name, setName] = useState(null);

    /* receved part */
    //validation of the nickname
    props.socket.on("nickname", data => {
        setShowLoading(false);
        if (data === "error") {
            setShowModalNickname(true);
        } else {
            setShowChat(true);
            setName(data);
        }
    });

    //newbe in the room
    props.socket.on("joined", data => {
        const newMess = `${data} has joined the room`;
        setMessages([newMess, ...messages]);
    });
    //receve message
    props.socket.on("newMessage", data => {
        setMessages([data, ...messages]);
    });

    /* Send part */
    //send message
    const sendChat = message => {
        props.socket.emit("newMessage", message);
    };

    //send a nickname
    const sendNickname = nickname => {
        setShowLoading(true);
        setShowModalNickname(false);
        props.socket.emit("nickname", nickname);
    };

    return (
        <div>
            <h1>{`Hello, ${name || "world"}!`}</h1>
            <Chat show={showChat} sendChat={sendChat} messages={messages} />
            <Nickname show={showModalNickname} sendNickname={sendNickname} />
            <Loading show={showLoading} />
        </div>
    );
};

export default Game;
