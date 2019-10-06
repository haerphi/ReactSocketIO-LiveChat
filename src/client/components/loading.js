import React from "react";
import ReactDOM from "react-dom";

function Loading(props) {
    if (props.show) {
        return ReactDOM.createPortal(
            <div id={"modalLoading"}>{"loading..."}</div>,
            document.body,
        );
    }
    return null;
}

export default Loading;
