
import React, { Component } from 'react'

export class SingleStudent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }

    
    render() {
        const {fname, lname} = this.props.student;

        const deleteStudent = () => {
            this.props.onDelete()
        }

        return (
            <div className="SingleStudent">
                <span>{fname} {lname}</span>
                <button onClick={deleteStudent}>delete</button>
            </div>
        )
    }
}

export default SingleStudent



