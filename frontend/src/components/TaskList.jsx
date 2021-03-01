import React, { Component } from 'react'
import Tabs from './Tabs'
import Task from './Task'

export default class WorkList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { tasks } = this.props;

        return (
            <div className="WorkList">
                <Tabs>
                    <div label="All">
                        {tasks.map(task => <Task task={task} />)}
                    </div>
                    <div label="Active">
                        {tasks.map(task => {
                            if (task.status === "Active") {
                                return <Task task={task}/>
                            }
                        })}
                    </div>
                    <div label="Completed">
                        {tasks.map(task => {
                            if (task.status === "Complete") {
                                return <Task task={task}/>
                            }
                        })}
                    </div>
                </Tabs>
                <button className="add-group-button" addTask={() => console.log("add task clicked")}>ADD TASK</button>
            </div>
            
        )
    }
}
