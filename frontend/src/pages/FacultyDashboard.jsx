import React, { Component } from 'react'
import StudentList from '../components/StudentList'
import TaskList from '../components/TaskList'
import ToReview from '../components/ToReview'


export default class FacultyDashboard extends Component {
    render() {
        const { groups, students, tasks, assignments, onDeleteStudent, onEditAssignment, onAddStudent, onAddGroup} = this.props

        return (
            <div className="FacultyDashboard">
                <StudentList onDeleteStudent={onDeleteStudent} onAddStudent={onAddStudent} onAddGroup={onAddGroup} groups={groups} students={students}/>
                <TaskList tasks={tasks}/>
                <ToReview onEditAssignment={onEditAssignment} assignments={assignments} students={students}/>
            </div>
        )
    }
}
