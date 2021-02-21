import React from 'react'
import FacultyDashboard from './FacultyDashboard'
import StudentDashboard from './StudentHome'

const defaultProps = {
  user: {
    type: 'faculty'
  }
}

export default function ClassMain(props) {
  props = Object.assign({}, defaultProps, props)
  const { user } = props
  return (
    user.type === 'faculty' ? <FacultyDashboard/> : <StudentDashboard/>
    )
}