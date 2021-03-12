import React, { useEffect, useRef, useState } from "react";
import Details from "./Details";

export default class Todo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            newName: ''
        }
    }

    handleChange = (e) => {
        this.setState({ newName: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { id, editTask } = this.props;
        const { newName } = this.state;

        if (!newName.trim()) {
            return;
        }
        editTask(id, newName);
        this.setState({ newName: "", editing: false });
    }

    render() {
        const { newName, editing } = this.state;
        const { name, id, completed, toggleTaskCompleted, deleteTask, selectTask } = this.props;
        return (
            <li className="todo">
                {editing ? 
                    (
                        <form className="stack-small" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="todo-label" htmlFor={id}>
                                New name for {name}
                                </label>
                                <input
                                    id={id}
                                    className="todo-text"
                                    type="text"
                                    value={newName}
                                    onChange={this.handleChange}
                                />
                            </div>
                            <div className="btn-group">

                                <button
                                    type="button"
                                    className="btn todo-cancel"
                                    onClick={() => this.setState({editing: false })}
                                >
                                    Cancel
                                    <span className="visually-hidden">renaming {name}</span>
                                </button>
                                <button type="submit" className="btn btn__primary todo-edit">
                                    Save
                                    <span className="visually-hidden">new name for {name}</span>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="stack-small">
                            <div className="c-cb">
                                <input
                                    id={id}
                                    type="checkbox"
                                    defaultChecked={completed}
                                    onChange={() => toggleTaskCompleted(id)}
                                />
                                <label className="todo-label" htmlFor={id}>
                                    {name}
                                </label>
                            </div>
                            <div className="btn-group">
                                <button
                                type="button"
                                className="btn"
                                onClick={() => selectTask(id)}
                                >
                                    Details <span className="visually-hidden">{name}</span>
                                </button>
                                <button
                                type="button"
                                className="btn"
                                onClick={() => this.setState({ editing: true })}
                                >
                                    Edit <span className="visually-hidden">{name}</span>
                                </button>
                                <button
                                    type="button"
                                    className="btn btn__danger"
                                    onClick={() => deleteTask(id)}
                                >
                                    Delete <span className="visually-hidden">{name}</span>
                                </button>
                            </div>
                        </div>
                    )
                }
            </li>
        );
    }
}