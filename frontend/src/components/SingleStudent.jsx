
import React, { Component } from 'react'

export class SingleStudent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }

    
    render() {
        console.log(this.props);
        const {name} = this.props.student;


        const deleteStudent = () => {
            this.props.onDeleteStudent()
        }

        return (
            <div className="SingleStudent">
                <span>{name}</span>
                <button className="delete-button" onClick={deleteStudent}>x</button>
            </div>
        )
    }
}

export default SingleStudent



