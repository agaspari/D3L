import React, {Component} from 'react'
import SingleStudent from './SingleStudent'
import StudentForm from './StudentForm'

class Group extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showComponent: false,
        }
    }

    showStudentForm() {
        this.setState({
            showComponent: !this.state.showComponent,
        });
    }

    render() {
        const { group, students, onDeleteStudent, onAddStudent, groupId, onSelectGroup } = this.props

        const deleteStudent = (studentId, groupId) => {
            onDeleteStudent(studentId, groupId)
        }

        group.studentIds.forEach(studentId => {
            console.log("ID: " + studentId);
            console.log(students[studentId]);
        });

        return (
            <div className="group-container">
                <header className="group-title">
                    {group.groupName}
                    <button className="add-button" onClick={()=>this.showStudentForm()}>+</button>
                    <button className="view-button" onClick={() => onSelectGroup(group.groupId)}>></button>
                </header>
                {group.studentIds && group.studentIds.map(
                    studentId => (
                        students[studentId] && (
                            <SingleStudent onDeleteStudent={() => deleteStudent(studentId, groupId)} student={students[studentId]} />
                        )
                    )
                )}
                {this.state.showComponent ?
                    <StudentForm onAddStudent={onAddStudent} students={students} groupId={groupId} group={group}/> :
                    null
                }
            </div>
        )
    }
}

export default Group;
