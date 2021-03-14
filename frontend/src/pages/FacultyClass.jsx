import React from "react";
//import { useContext } from 'react';
import StudentList from '../components/StudentList'
import TaskList from '../components/TaskList'
import ToReview from '../components/ToReview'
import { UserContext } from "../UserProvider";
import Form from "../components/Form";
import FilterButton from "../components/FilterButton";
import Todo from "../components/Todo";
import { nanoid } from "nanoid";
import Details from "../components/Details"

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};
  
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default class FacultyClass extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            groups: undefined,
            students: undefined,
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
            },
            tasks: [],
            filter: 'All',
            taskList: [],
            dueDate: "",
            description: "",
            group: undefined
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

        const { filter } = this.state;

        this.setState({
            filterList: FILTER_NAMES.map(name => (
                <FilterButton
                    key={name}
                    name={name}
                    isPressed={name === filter}
                    setFilter={(name) => { this.setState({ filter: name }, () => { this.update() })}}
                />
            ))
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
            let groups = this.state.groups || {};
            
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

    update = () => {
        let { taskList, tasks, filter } = this.state;
        console.log(tasks, taskList);
        taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
                <Todo
                    id={task.taskId}
                    name={task.taskName}
                    completed={task.status === "complete"}
                    key={task.taskId}
                    toggleTaskCompleted={this.toggleTaskCompleted}
                    deleteTask={this.deleteTask}
                    editTask={this.editTask}
                    selectTask={this.selectTask}
                />
        ));
    
        this.setState({ taskList });
    }

    updateDescription = (id, newDescription) => {
        const { tasks } = this.state;
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.taskId) {
                return {...task, description: newDescription}
            }
            return task;
        });

        this.setState({ tasks: editedTaskList }, () => { this.update() });
    }

    toggleTaskCompleted = (id) => {
        const { tasks } = this.state;
        const updatedTasks = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.taskId) {
              // use object spread to make a new obkect
              // whose `completed` prop has been inverted
                fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/task/update`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        taskId: id,
                        status: (task.status == "incomplete") ? "complete" : "incomplete"
                    })
                });
                return {...task, completed: !task.completed}
            }
            return task;
        });
        this.setState({ tasks: updatedTasks }, () => { this.update() });
    }

    deleteTask = (id) => {
        const { tasks, group } = this.state;
        const remainingTasks = tasks.filter(task => id !== task.taskId);
        this.setState({ tasks: remainingTasks }, () => { this.update() });

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/task/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: id,
            })
        });
    }
  
    editTask = (id, newName) => {
        const { tasks } = this.state;
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.taskId) {
                return {...task, taskName: newName}
            }
            return task;
        });

        this.setState({ tasks: editedTaskList }, () => { this.update() });
    }
  
    addTask = (name, description, dueDate) => {
        const { tasks, group } = this.state;
        console.log("ADDding task: ", group);
        const newTask = { taskId: "todo-" + nanoid(), taskName: name, completed: false, taskDescription: description, dateDue: dueDate, status: "incomplete" };

        console.log(group);
        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/task/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: newTask.taskId,
                taskName: name,
                taskDescription: description,
                status: "uncomplete",
                datePosted: new Date(),
                dateDue: dueDate,
                groupId: group.groupId,
                creatorId: this.context.uid
            })
        });
        tasks.push(newTask);
        this.setState({ tasks }, () => { this.update() });
    }

    selectGroup = (groupId) => {
        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/task/${groupId}/`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;
            
            this.setState({ tasks: data }, () => { this.update(); });
        });
    }
  
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    selectTask = (taskId) => {
        const { tasks } = this.state;
        const task = tasks.filter(task => task.taskId === taskId)[0];

        console.log(task, taskId);
        this.setState({ description: task.taskDescription, dueDate: task.dateDue });
    }

    render() {
        const { groups, students, tasks, assignments } = this.state;
        const { filterList, taskList, description, dueDate, group, studentList, groupList } = this.state;

        if (students) {
            return (
                <div className="FacultyDashboard">
                    <StudentList onDeleteStudent={this.deleteStudent} onAddStudent={this.addStudent} onSelectGroup={this.selectGroup} onAddGroup={this.addGroup} groups={groups} students={students}/>
                    <div className="todoapp stack-large">
                        <div className="filters btn-group stack-exception">
                            {filterList}
                        </div>
                        <h2 id="list-heading" tabIndex="-1" >
                            {taskList.length} task(s) remaining
                        </h2>
                        <ul
                            role="list"
                            className="todo-list stack-large stack-exception"
                            aria-labelledby="list-heading"
                        >
                            {taskList}
                        </ul>
                        <Form addTask={this.addTask} />
                    </div>
                    {description.length > 0 && 
                        <Details
                            description={description}
                            dueDate={dueDate}
                        />
                    }
                    {/* <TaskList tasks={tasks}/>
                    <ToReview onEditAssignment={this.editAssignment} assignments={assignments} students={students}/> */}
                </div>
            );
        }
        return <span>Loading</span>;

    }
}