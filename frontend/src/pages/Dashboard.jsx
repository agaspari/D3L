import React, { Component } from 'react'
import FacultyDashboard from './FacultyDashboard'
import StudentDashboard from './StudentDashboard'
import { UserContext } from "../UserProvider";

export default class Dashboard extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props)
    
    this.state = {

    }
  }

  render() {
    if (!this.context) {
        this.props.history.push("/login");
    }
    if (this.context.isFaculty) {
        return <FacultyDashboard />
    } else {
        return <StudentDashboard />
    }
  }
}
