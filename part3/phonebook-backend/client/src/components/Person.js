import React from "react";

const Person =({person,removeEntry}) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button onClick={() => removeEntry(person)}>Delete</button></td>
        </tr>
    )
}

export default Person