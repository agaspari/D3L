
import React, { Component } from 'react'

export class SingleStudent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    
    render() {
        const {fname, lname} = this.props.student;

        return (
            <div className="SingleStudent">
                <span>{fname} {lname}</span>
            </div>
        )
    }
}

export default SingleStudent



