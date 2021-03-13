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
        const {group, students, onDeleteStudent, onAddStudent, groupKey} = this.props

        const deleteStudent = (studentId, groupKey) => {
            onDeleteStudent(studentId, groupKey)
        }

        console.log(students);
        return (
            <div className="group-container">
                <header className="group-title">
                    {group.title}
                    <button className="add-button" onClick={()=>this.showStudentForm()}>+</button>
                </header>
                {group.studentIds.map(
                    studentId => (
                        students[studentId] && (
                        <SingleStudent onDeleteStudent={() => deleteStudent(studentId, groupKey)} student={students[studentId]} />
                    ))
                )}
                {this.state.showComponent ?
                    <StudentForm onAddStudent={onAddStudent} students={students} groupKey={groupKey} group={group}/> :
                    null
                }
            </div>
        )
    }
}

export default Group;
