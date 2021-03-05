import React, { Component } from 'react';
import Group from './Group';
import GroupForm from './GroupForm'

class StudentList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { groups, students, onDeleteStudent, onAddStudent, onAddGroup } = this.props;

        return (
            <div className="StudentList">
                <header>Students</header>
                {Object.entries(groups).map(([k, group]) => 
                    (<Group onDeleteStudent={onDeleteStudent} onAddStudent={onAddStudent} group={group} students={students} groupKey={k}/>))}
                {<button className="add-button" onClick={() => console.log("add group clicked")}>ADD GROUP</button>}
                <GroupForm onAddGroup={onAddGroup}/>
            </div>
        );
    }
}

export default StudentList;
