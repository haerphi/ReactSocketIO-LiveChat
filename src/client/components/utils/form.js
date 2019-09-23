import React from "react";
import Button from "./button";

function Form(props) {
    const geInputValue = () => {
        props.sendChat(document.querySelector("#messageInput").value);
        document.querySelector("#messageInput").value = "";
    };
    return (
        <div>
            <input id={"messageInput"} type={"text"} />
            <Button handleFunction={geInputValue} text={"Send"} />
        </div>
    );
}

export default Form;
