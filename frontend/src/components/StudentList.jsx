import React, { Component } from 'react';
import SingleStudent from './SingleStudent';

class StudentList extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const {groups, students, onDeleteStudent} = this.props;

        return (
            <div className="StudentList">
                {groups.map(group => (
                    <div className="group-container">
                        <header className="group-title">{group.title}</header>
                        {group.studentIds.map(studentId => <SingleStudent onDelete={onDeleteStudent} student={students[studentId]}/>)}
                    </div>                
                ))} 
            </div>
        );
    }
}

export default StudentList;
