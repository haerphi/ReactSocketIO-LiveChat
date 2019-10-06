import React from "react";
import Form from "./utils/form";

function Chat(props) {
    if (props.show) {
        return (
            <div>
                <Form sendChat={props.sendChat} />
                <hr />
                <ul>
                    {props.messages.map((message, index) => (
                        <li key={`m${index + 1}`}>{message}</li>
                    ))}
                </ul>
            </div>
        );
    }
    return null;
}

export default Chat;
