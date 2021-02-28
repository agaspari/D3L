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
      ],
      assignments: {
        10: {title: "Homework1", content: "Hello, this...", studentIds: [1]},
        11: {title: "Homework2", content: "Hello, this...", studentIds: [2]},
        12: {title: "Homework3", content: "Hello, this...", studentIds: [3]},
        13: {title: "Homework1", content: "Hello, this...", studentIds: [1]},
        14: {title: "Homework2", content: "Hello, this...", studentIds: [2]},
        15: {title: "Homework3", content: "Hello, this...", studentIds: [3]},
        16: {title: "Homework1", content: "Hello, this...", studentIds: [1]},
        17: {title: "Homework2", content: "Hello, this...", studentIds: [2]},
        18: {title: "Homework3", content: "Hello, this...", studentIds: [3]}
    }

    }
  }

  render() {
    const props = Object.assign({}, defaultProps, this.props)
    const { user } = props
    const { groups, students, tasks, assignments } = this.state


    const deleteStudent = () => {
      const changes = { groups: [] }
      this.setState(Object.assign({}, this.state, changes))
    }

    const editAssignment = () => {
      alert("editAssignment clicked")
    }


    if (user.type === 'faculty') {
      return <FacultyDashboard onEditAssignment={editAssignment} onDeleteStudent={deleteStudent} groups={groups} students={students} tasks={tasks} assignments={assignments} />
    } else {
      return <StudentDashboard />
    }
  }
}

export default ClassMain;