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
                {Object.entries(assignments).map(([id, assignment]) => <Assignment onEdit={onEditAssignment} assignment={assignment} key={id} students={students}/>)}
            </div>
        )
    }
}
