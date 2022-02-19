import React from "react"
const Filter = ({searchName, handleChange, setSearchName}) => {
    return (
        <div>
            filter shown with: <input value={searchName} onChange={handleChange(setSearchName)} />
        </div>
    )
}

export default Filter