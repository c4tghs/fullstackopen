import React from "react";

const TextField = ({text, inputValue, handleChange}) => {
    return (
        <div>
            <span>{text}</span> <input value={inputValue} onChange={handleChange} />
        </div>
    )
}

export default TextField