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

        return (
            <div className="StudentList">
                <header>Students</header>
                {Object.entries(groups).map(([k, group]) => 
                    (<Group onDeleteStudent={onDeleteStudent} onAddStudent={onAddStudent} group={group} students={students} groupKey={k}/>))}
                {<button className="add-button" onClick={() => this.showGroupForm()}>ADD GROUP</button>}
                {this.state.showComponent ? <GroupForm onAddGroup={onAddGroup}/> : null}
            </div>
        );
    }
}

export default StudentList;
