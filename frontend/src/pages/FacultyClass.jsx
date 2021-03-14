import React from "react";
//import { useContext } from 'react';
import StudentList from '../components/StudentList'
import TaskList from '../components/TaskList'
import ToReview from '../components/ToReview'
import { UserContext } from "../UserProvider";

export default class FacultyClass extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            groups: {
                22: { title: "Group 1", studentIds: ["lARR5sMpnUUSqoX1y9VrVGlyE562"] },
                44: { title: "Group 2", studentIds: [] }
            },
            students: undefined,
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
        };
    }

    componentDidMount() {
        const { classId } = this.props;

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/class/${classId}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            data = data.result;
            let students = {};
            for (let i = 0; i < data.length; i++) {
                students[data[i].userId] = data[i];
            }
            this.setState({ students });
        });

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/group/assignees/${classId}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;
            let groups = {};
            for (let i = 0; i < data.length; i++) {
                console.log(data[i]);
                if (groups[data[i].groupId]) {
                    groups[data[i].groupId].studentIds.push(data[i].userId);
                } else {
                    groups[data[i].groupId] = data[i];
                    groups[data[i].groupId].studentIds = [ data[i].userId ];
                }
            }
            this.setState({ groups });
        });
    }

    deleteStudent = (studentId, groupId) => {
        const { groups } = this.state;
        const { classId } = this.props;

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/group/removeMember`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                classId: classId,
                userId: studentId,
                groupId
            })
        });
        groups[groupId].studentIds = groups[groupId].studentIds.filter(id => id !== studentId);

        this.setState({ groups });
    }

    addStudent = (studentId, groupId) => {
        const { groups } = this.state;
        const { classId } = this.props;

        groups[groupId].studentIds.push(studentId);

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/group/addMember`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                classId: classId,
                userId: studentId,
                groupId
            })
        });
        this.setState({groups})
    }

    addGroup = (groupName) => {
        const { groups } = this.state;
        const { classId } = this.props;

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/group/create`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                classId,
                groupName
            })
        })
        .then(res => res.json())
        .then(data => {
            groups[data.key] = {
                groupName,
                studentIds: [],
            }
            //const newKey = Math.max(...Object.keys(groups).map(group => Number(group))) + 1
            // const newGroup = {title, studentIds: []}
            // const newGroups = Object.assign({}, groups, {[newKey]: newGroup})
            this.setState({ groups })
        });
    }
    
    editAssignment = () => {

    }

    render() {
        const { groups, students, tasks, assignments } = this.state;
        console.log("Students: ", students);
        if (students) {
            return (
                <div className="FacultyDashboard">
                    <StudentList onDeleteStudent={this.deleteStudent} onAddStudent={this.addStudent} onAddGroup={this.addGroup} groups={groups} students={students}/>
                    <TaskList tasks={tasks}/>
                    <ToReview onEditAssignment={this.editAssignment} assignments={assignments} students={students}/>
                </div>
            );
        }
        return <span>Loading</span>;

    }
}