import React, {Component} from 'react'
import SingleStudent from './SingleStudent'
import StudentForm from './StudentForm'

class Group extends Component {
    constructor(props) {
        super(props)
    }

    render() {

        const {group, students, onDeleteStudent, onAddStudent, groupKey} = this.props

        const deleteStudent = (studentId, groupKey) => {
            onDeleteStudent(studentId, groupKey)
        }


        return (
            <div className="group-container">
                <header className="group-title">
                    {group.title}
                    <button className="add-button" onClick={() => console.log("add student clicked")}>+</button>
                </header>
                {group.studentIds.map(studentId => <SingleStudent onDeleteStudent={() => deleteStudent(studentId, groupKey)} student={students[studentId]} />)}
                <StudentForm onAddStudent={onAddStudent} students={students} groupKey={groupKey}/>
            </div>
        )
    }
}

export default Group;
