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
        const { assignment: { title, content, studentIds, submitDate }, students } = this.props; 
        
        const authors = studentIds.map(id => students[id])

        const editAssignment = () => {
            this.props.onEdit()
        }

        return (
            <div className="Assignment" onClick={this.editAssignment}>
                <header>{title}</header>
                {this.state.showComponent ?
                    <AssignmentDetail content={content} submitDate={submitDate} authors={authors}/> :
                    null
                }
            </div>
        )
    }
}

export default Assignment;
