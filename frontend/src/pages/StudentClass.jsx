import React, { useState, useRef, useEffect } from "react";
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

export default class StudentClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            filter: 'All',
            taskList: [],
            dueDate: "",
            description: ""
        }
    }
  
    update = () => {
        let { taskList, tasks, filter } = this.state;
        console.log(tasks, taskList);
        taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
                <Todo
                    id={task.id}
                    name={task.name}
                    completed={task.completed}
                    key={task.id}
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
            if (id === task.id) {
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
            if (id === task.id) {
              // use object spread to make a new obkect
              // whose `completed` prop has been inverted
              return {...task, completed: !task.completed}
            }
            return task;
        });
        this.setState({ tasks: updatedTasks }, () => { this.update() });
    }
  
  
    deleteTask = (id) => {
        const { tasks } = this.state;
        const remainingTasks = tasks.filter(task => id !== task.id);
        this.setState({ tasks: remainingTasks }, () => { this.update() });
    }
  
    editTask = (id, newName) => {
        const { tasks } = this.state;
        const editedTaskList = tasks.map(task => {
            // if this task has the same ID as the edited task
            if (id === task.id) {
                return {...task, name: newName}
            }
            return task;
        });

        this.setState({ tasks: editedTaskList }, () => { this.update() });
    }
  
    addTask = (name, description, dueDate) => {
        const { tasks } = this.state;
        const newTask = { id: "todo-" + nanoid(), name, completed: false, description: description, dueDate };

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
        const task = tasks.filter(task => task.id === taskId)[0];

        console.log(task, taskId);
        this.setState({ description: task.description, dueDate: task.dueDate });
    }

    componentDidMount() {
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

    render() {
        const { filterList, taskList, description, dueDate } = this.state;
        return (
            <div>
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
                <Details
                    description={description}
                    dueDate={dueDate}
                />
           </div>
        );
    }
}