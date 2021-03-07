import React, { Component } from 'react'
import Assignment from './Assignment';

export default class ToReview extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
        }
    }
    
    render() {
        const { assignments, onEditAssignment, students } = this.props;

        return (
            <div className="ToReview">
                <header>To Review</header>
                {Object.keys(assignments).map(key => <Assignment onEdit={onEditAssignment} assignment={assignments[key]} students={students}/>)}
            </div>
        )
    }
}
