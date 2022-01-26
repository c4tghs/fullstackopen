import React from "react";
import Person from "./Person";

const Persons = ({persons, searchName, remoteEntry}) => {
    return (
        <div>
            <table>
                <tbody>
                    {
                        persons.map((person) => {
                            if (searchName.length === 0 || person.name.search(searchName) !== -1) {
                                return (
                                  <Person key={person.name} person={person} removeEntry={remoteEntry} />
                                )
                            }
                            else {
                                return []
                            }

                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Persons