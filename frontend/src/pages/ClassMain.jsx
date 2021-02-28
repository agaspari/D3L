import React, { Component } from 'react'
import FacultyDashboard from './FacultyDashboard'
import StudentDashboard from './StudentHome'

const defaultProps = {
  user: {
    type: 'faculty'
  }
}

class ClassMain extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groups: [
        { title: "red", studentIds: [1, 2] },
        { title: "blue", studentIds: [3, 4] }
      ],
      students: {
        1: { fname: "Lisa", lname: "Anthony" },
        2: { fname: "Doug", lname: "Winters" },
        3: { fname: "Clementine", lname: "Smith" },
        4: { fname: "Pat", lname: "Johnson" }
      },
      tasks: [
        { title: "Add state to todo.", status: "active" },
        { title: "Add edit assignment feature.", status: "active" },
        { title: "Edit student list.", status: "complete" }
      ]
    }
  }

  render() {
    const props = Object.assign({}, defaultProps, this.props)
    const { user } = props
    const { groups, students, tasks } = this.state


    const deleteStudent = () => {
      const changes = { groups: [] }
      this.setState(Object.assign({}, this.state, changes))
    }


    if (user.type === 'faculty') {
      return <FacultyDashboard onDeleteStudent={deleteStudent} groups={groups} students={students} tasks={tasks} />
    } else {
      return <StudentDashboard />
    }
  }
}

export default ClassMain;