import React, { Component } from 'react'
import StudentList from '../components/StudentList'
import WorkList from '../components/WorkList'
import ToReview from '../components/ToReview'


export default class FacultyDashboard extends Component {
    render() {
        const {groups, students, onDeleteStudent} = this.props

        return (
            <div className="FacultyDashboard">
                <StudentList onDeleteStudent={onDeleteStudent} groups={groups} students={students}/>
                <WorkList/>
                <ToReview/>
            </div>
        )
    }
}
