import React, { Component } from 'react';
import SingleStudent from './SingleStudent';

class StudentList extends Component {
    constructor(props) {
        super(props)
    
        this.state = { 
            groups: [
                {title: "red", studentIds: [1, 2]},
                {title: "blue", studentIds: [3, 4]}
            ], 
            
            students: {
                1: {fname: "Lisa", lname: "Anthony" },
                2: {fname: "Doug", lname: "Winters" },
                3: {fname: "Clementine", lname: "Smith" },
                4: {fname: "Pat", lname: "Johnson" }
            }
        }
    }
    
    render() {
        const {groups, students} = this.state;

        return (
            <div className="StudentList">
                {groups.map(group => (
                    <div className="group-container">
                        <header className="group-title">{group.title}</header>
                        {group.studentIds.map(studentId => <SingleStudent student={students[studentId]}/>)}
                    </div>                
                ))} 
            </div>
        );
    }
}

export default StudentList;
