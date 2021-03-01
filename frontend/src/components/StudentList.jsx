import React, { Component } from 'react';
import SingleStudent from './SingleStudent';

class StudentList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { groups, students, onDeleteStudent } = this.props;

        const editRoster = () => {
            console.log("edit clicked")
        }

        const deleteStudent = (studentId, groupKey) => {
            onDeleteStudent(studentId, groupKey)
        }

        return (
            <div className="StudentList">
                <header>Students</header>
                {Object.entries(groups).map(([k, group]) => (
                    <div className="group-container">
                        <header className="group-title">
                            {group.title}
                            <button className="add-button">+</button>
                        </header>
                        {group.studentIds.map(studentId => <SingleStudent onDelete={() => deleteStudent(studentId, k)} student={students[studentId]} />)}
                    </div>
                ))}
                <button className="add-group-button" onClick={editRoster}>ADD GROUP</button>
            </div>
        );
    }
}

export default StudentList;
