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
      groups: {
        22: { title: "Group 1", studentIds: [1, 2] },
        44: { title: "Group 2", studentIds: [3, 4] }
      },
      students: {
        1: { fname: "Lisa", lname: "Anthony" },
        2: { fname: "Doug", lname: "Winters" },
        3: { fname: "Clementine", lname: "Smith" },
        4: { fname: "Pat", lname: "Johnson" }
      },
      tasks: [
        { title: "Add state to todo.", status: "Active" },
        { title: "Add edit assignment feature.", status: "Active" },
        { title: "Edit student list.", status: "Complete" }
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


    const deleteStudent = (studentId, groupKey) => {
      const oldGroup = groups[groupKey]
      const newIds = groups[groupKey].studentIds.filter(id => id !== studentId)
      this.setState(Object.assign({}, oldGroup.studentIds, oldGroup.studentIds = newIds))
    }


    if (user.type === 'faculty') {
      return <FacultyDashboard  onDeleteStudent={deleteStudent} groups={groups} students={students} tasks={tasks} assignments={assignments} />
    } else {
      return <StudentDashboard />
    }
  }
}

export default ClassMain;