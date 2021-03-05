import React, { Component } from 'react';
import Group from './Group';

class StudentList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { groups, students, onDeleteStudent, onAddStudent } = this.props;

        return (
            <div className="StudentList">
                <header>Students</header>
                {Object.entries(groups).map(([k, group]) => (<Group onDeleteStudent={onDeleteStudent} onAddStudent={onAddStudent} group={group} students={students} groupKey={k}/>))}
                {<button className="add-button" onClick={() => console.log("add group clicked")}>ADD GROUP</button>}
            </div>
        );
    }
}

export default StudentList;
