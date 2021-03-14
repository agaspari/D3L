import React, { Component } from 'react';
import Group from './Group';
import GroupForm from './GroupForm'

class StudentList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showComponent: false,
        }
    }

    showGroupForm() {
        this.setState({
            showComponent: !this.state.showComponent,
        });
    }

    render() {
        const { groups, students, onDeleteStudent, onAddStudent, onAddGroup } = this.props;
        console.log("In Student List: ", groups);
        return (
            <div className="StudentList">
                <div>
                    <h5>Students</h5>
                    <ul>
                        {Object.values(students).map((student) => (
                            <li>{student.name}</li>
                        ))}
                    </ul>
                </div>
                <br/>
                <div>
                    <h5>Groups</h5>
                    {Object.entries(groups).map(([k, group]) => 
                        (<Group onDeleteStudent={onDeleteStudent} onAddStudent={onAddStudent} group={group} students={students} groupId={k}/>))}
                    {<button className="add-button" onClick={() => this.showGroupForm()}>ADD GROUP</button>}
                    {this.state.showComponent ? <GroupForm onAddGroup={onAddGroup}/> : null}
                </div>
            </div>

        );
    }
}

export default StudentList;
