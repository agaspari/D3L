import React from 'react'

export default function Task(props) {

    return (
        <div className="single-task">
            <p>{props.task.title}</p>
            <footer>{props.task.status}</footer>
        </div>
    )
}
