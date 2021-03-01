import React, { Component } from 'react';
import AssignmentDetail from './AssignmentDetail';

export class Assignment extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showComponent: false,
        };
        this.editAssignment = this.editAssignment.bind(this);
    }

    editAssignment() {
        this.setState({
            showComponent: !this.state.showComponent,
        });
    }
    
    render() {
        const {title, content} = this.props.assignment;

        const editAssignment = () => {
            this.props.onEdit()
        }

        return (
            <div className="Assignment" onClick={this.editAssignment}>
                <header>{title}</header>
                <p>{content}</p>
                {this.state.showComponent ?
                    <AssignmentDetail /> :
                    null
                }
            </div>
        )
    }
}

export default Assignment;
