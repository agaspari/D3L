import React, { Component } from 'react';

export default class StudentGroup extends Component {
    constructor(props) {
        super(props)

        this.state = {
            group: { title: "Group 1", studentIds: [1, 2] },

            students: {
                1: { fname: "Lisa", lname: "Anthony" },
                2: { fname: "Doug", lname: "Winters" },
                3: { fname: "Clementine", lname: "Smith" },
                4: { fname: "Pat", lname: "Johnson" }
            },
        }
    }

    render() {
        const { group, students } = this.state;
        return (
            <div className="StudentList">
                <header>{group.title}</header>
                {group.studentIds.map(studentId =>
                    <div className="SingleStudent">
                        <span>{students[studentId].fname} {students[studentId].lname}</span>
                    </div>
                    )}
            </div>
        )
    }

}
