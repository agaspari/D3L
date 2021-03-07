
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
            this.props.onDeleteStudent()
        }

        return (
            <div className="SingleStudent">
                <span>{fname} {lname}</span>
                <button className="delete-button" onClick={deleteStudent}>x</button>
            </div>
        )
    }
}

export default SingleStudent



