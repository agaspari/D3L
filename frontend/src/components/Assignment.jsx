import React, { Component } from 'react'

export class Assignment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    
    render() {
        const {title, content} = this.props.assignment;

        const editAssignment = () => {
            console.log(title)
        }

        return (
            <div className="Assignment" onClick={editAssignment}>
                <header>{title}</header>
                <p>{content}</p>
            </div>
        )
    }
}

export default Assignment;
