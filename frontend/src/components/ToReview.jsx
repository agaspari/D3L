import React, { Component } from 'react'
import Assignment from './Assignment';

export default class ToReview extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            assignments: {
                10: {title: "Homework1", content: "Hello, this...", studentIds: [1]},
                11: {title: "Homework2", content: "Hello, this...", studentIds: [2]},
                12: {title: "Homework3", content: "Hello, this...", studentIds: [3]},
                13: {title: "Homework1", content: "Hello, this...", studentIds: [1]},
                14: {title: "Homework2", content: "Hello, this...", studentIds: [2]},
                15: {title: "Homework3", content: "Hello, this...", studentIds: [3]},
                16: {title: "Homework1", content: "Hello, this...", studentIds: [1]},
                17: {title: "Homework2", content: "Hello, this...", studentIds: [2]},
                18: {title: "Homework3", content: "Hello, this...", studentIds: [3]}
            }
        }
    }
    
    render() {
        const { assignments } = this.state

        return (
            <div className="ToReview">
                <header>To Review</header>
                {Object.keys(assignments).map(key => <Assignment assignment={assignments[key]}/>)}
            </div>
        )
    }
}
