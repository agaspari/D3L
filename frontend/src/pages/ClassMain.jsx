import React, { Component } from 'react'
import FacultyDashboard from './FacultyDashboard'
import StudentDashboard from './StudentDashboard'

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
        10: { title: "Homework1", content: "Hello, this...", studentIds: [1, 2], submitDate: '2/3/21' },
        11: { title: "Homework2", content: "Hello, this...", studentIds: [2, 4], submitDate: '2/6/21' },
        12: { title: "Homework3", content: "Hello, this...", studentIds: [3, 1], submitDate: '2/8/21' },
        13: { title: "Homework4", content: "Hello, this...", studentIds: [1], submitDate: '2/3/21' },
        14: { title: "Homework5", content: "Hello, this...", studentIds: [2], submitDate: '2/4/21' },
        15: { title: "Homework6", content: "Hello, this...", studentIds: [3], submitDate: '2/2/21' },
        16: { title: "Homework7", content: "Hello, this...", studentIds: [1], submitDate: '2/3/21' },
        17: { title: "Homework8", content: "Hello, this...", studentIds: [2], submitDate: '2/3/21' },
        18: { title: "Homework9", content: "Hello, this...", studentIds: [3], submitDate: '2/3/21' }
      }
    }
  }

  render() {
    const props = Object.assign({}, defaultProps, this.props)
    const { user } = props
    const { groups, students, tasks, assignments } = this.state


    const deleteStudent = (studentId, groupKey) => {
      const oldGroup = groups[groupKey]
      const newStudentIds = oldGroup.studentIds.filter(id => id !== studentId)
      const newGroup = Object.assign({}, oldGroup, {studentIds: newStudentIds})
      const newGroups = Object.assign({}, groups, {[groupKey]: newGroup})
      this.setState({groups: newGroups})
    }

    const addStudent = (studentId, groupKey) => {
      const oldGroup = groups[groupKey]
      const newStudentIds = oldGroup.studentIds.concat([studentId])
      const newGroup = Object.assign({}, oldGroup, {studentIds: newStudentIds})
      const newGroups = Object.assign({}, groups, {[groupKey]: newGroup})
      this.setState({groups: newGroups})
    }

    const addGroup = (title) => {
      const newKey = Math.max(...Object.keys(groups).map(group => Number(group))) + 1
      const newGroup = {title, studentIds: []}
      const newGroups = Object.assign({}, groups, {[newKey]: newGroup})
      this.setState({groups: newGroups})
    }
    
    if (user.type === 'faculty') {
      return <FacultyDashboard  onDeleteStudent={deleteStudent} onAddStudent={addStudent} onAddGroup={addGroup} groups={groups} students={students} tasks={tasks} assignments={assignments} />
    } else {
      return <StudentDashboard />
    }
  }
}

export default ClassMain;