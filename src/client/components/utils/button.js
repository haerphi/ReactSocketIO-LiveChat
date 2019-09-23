import React from "react";

const Button = props => (
    <button type={"button"} onClick={props.handleFunction}>
        {props.text}
    </button>
);

export default Button;
