import React, { useState } from "react";

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            dueDate: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { addTask } = this.props;
        const { name, description, dueDate } = this.state;
        if (!name.trim() && !description.trim()) {
            return;
        }
        addTask(name, description, dueDate);
        this.setState({ name: "", description: "", dueDate: "" });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { name, description, dueDate } = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <h2 className="label-wrapper">
                    <label htmlFor="new-todo-input" className="label__lg">
                        What needs to be done?
                    </label>
                </h2>
            
                <input
                    placeholder="Enter a New Task"
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="name"
                    autoComplete="off"
                    value={name}
                    onChange={this.onChange}
                />

                <br></br>

                <input
                    placeholder="Task Description"
                    type="text"
                    id="new-todo-input"
                    className="input input__lg"
                    name="description"
                    autoComplete="off"
                    value={description}
                    onChange={this.onChange}
                />

                <br></br>

                <input
                    placeholder="Task Description"
                    type="date"
                    id="new-todo-input"
                    className="input input__lg"
                    name="dueDate"
                    autoComplete="off"
                    value={dueDate}
                    onChange={this.onChange}
                />
                <br></br>
                <button type="submit" className="btn btn__primary btn__lg">
                    Add
                </button>
            </form>
        );
    }
}