import React from "react";
import ReactDOM from "react-dom";

function Nickname(props) {
    const test = () => {
        if (
            document.querySelector("#nickname").value.length > 0 &&
            document.querySelector("#nickname").value !== "error"
        ) {
            props.sendNickname(document.querySelector("#nickname").value);
        } else {
            document.querySelector("#nicknameError").textContent = "error";
        }
    };
    if (props.show) {
        return ReactDOM.createPortal(
            <div id={"modalNickname"}>
                <p id={"nicknameError"}>{""}</p>
                <label htmlFor={"nickname"}>{"Nickname"}</label>
                <input id={"nickname"} name={"nickname"} type={"text"} />
                <button type={"button"} onClick={test}>
                    {"send"}
                </button>
            </div>,
            document.body,
        );
    }
    return null;
}

export default Nickname;
