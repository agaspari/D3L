import React, { useState, useRef, useEffect } from "react";
import Form from "../components/Form";
import FilterButton from "../components/FilterButton";
import Todo from "../components/Todo";
import { nanoid } from "nanoid";
import Details from "../components/Details"
import { UserContext } from "../UserProvider";

const FILTER_MAP = {
    All: () => true,
    Active: task => !task.completed,
    Completed: task => task.completed
};
  
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default class StudentClass extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            filter: 'All',
            taskList: [],
            dueDate: "",
            description: "",
            group: undefined
        }
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

    componentDidMount() {
        const { filter } = this.state;
        const { classId } = this.props;

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

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/users/group/${this.context.uid}/${classId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;
            if (data[0] && data[0].groupId) {
                fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/task/${data[0].groupId}/`, {
                    method: "GET"
                })
                .then(res => res.json())
                .then(data2 => {
                    if (data2.result) data2 = data2.result;
                    
                    this.setState({ group: data[0], tasks: data2 }, () => { this.update(); });
                });

                fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/group/groupAssigness/${data[0].groupId}`, {
                    method: 'GET'
                })
                .then(res => res.json())
                .then(data2 => {
                    if (data2.result) data2 = data2.result;

                    this.setState({ groupList: data2 });
                });
            }
        });
        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/class/${classId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;

            this.setState({ studentList: data });
        });

    }

    render() {
        const { filterList, taskList, description, dueDate, group, studentList, groupList } = this.state;
        if (group) {
            return (
                <div className="studentClass">
                    <div className="row">
                        <div className="col-md-6 studentClassList">
                            <h5>Class List</h5>
                            <ul>
                                {studentList && studentList.map((student) => (
                                    <li>{student.name}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="col-md-6 studentClassList">
                            <h5>Group List</h5>
                            <ul>
                                {groupList && groupList.map((student) => (
                                    <li>{student.name}</li>
                                ))}
                            </ul>
                        </div>
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

                    </div>
               </div>
            );
        } else {
            return <p>You are currently not assigned to a group for this class. Please wait for your instructor to assign you to a group.</p>
        }

    }
}