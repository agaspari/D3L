import React, { Component } from 'react'

class StudentForm extends Component {
    constructor(props) {
        super(props);

        this.state = { studentId: 'default' }
    }

    handleChange(event) {
        this.setState({ studentId: event.target.value });
    }

    addStudent = (event) => {
        event.preventDefault();

        const { studentId } = this.state;
        const { groupId } = this.props;

        this.props.onAddStudent(studentId, groupId);
        this.setState({ studentId: 'default' })
    }

    render() {

        const { students, group } = this.props;

        return (
            <form onSubmit={this.addStudent}>
                <label>
                    <select value={this.state.studentId} onChange={(event) => this.handleChange(event)}>
                        <option value='default' key='default' selected disabled hidden>Choose here</option>
                        {Object.entries(students).map(([id, student]) => {
                            if (!(group.studentIds.includes(id))) {
                                return (<option key={id} value={id}>{student.name} </option>)
                            }
                        })
                        };
                    </select>
                </label>
                <input type="submit" value="Submit" disabled={!this.state.studentId} />
            </form>
        );
    }
}

export default StudentForm;
