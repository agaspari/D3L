import React, { Component } from 'react'
import StudentList from '../components/StudentList'
import WorkList from '../components/WorkList'
import ToReview from '../components/ToReview'


export default class FacultyDashboard extends Component {
    render() {
        return (
            <div className="FacultyDashboard">
                <StudentList/>
                <WorkList/>
                <ToReview/>
            </div>
        )
    }
}
