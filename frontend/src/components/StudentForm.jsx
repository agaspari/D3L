import React, { Component } from 'react'

class StudentForm extends Component {
    constructor(props) {
        super(props);

        this.state = { studentId: '' }

        this.handleChange = this.handleChange.bind(this);
        this.addStudent = this.addStudent.bind(this);
    }

    handleChange(event) {
        this.setState({ studentId: event.target.value });
    }

    addStudent = (event) => {
        event.preventDefault();

        const { studentId } = this.state;
        const { groupKey } = this.props;

        this.props.onAddStudent(Number(studentId), groupKey);
    }

    render() {

        const { students, group } = this.props;

        return (
            <form onSubmit={this.addStudent}>
                <label>
                    <select value={this.state.studentId} onChange={this.handleChange}>
                        <option value="" selected disabled hidden>Choose here</option>
                        {Object.entries(students).map(([id, student]) => {
                            if (!(group.studentIds.includes(Number(id)))) {
                                return (<option value={id}>{id}: {student.fname} {student.lname}</option>)
                            }
                        })
                        };
                    </select>
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default StudentForm;
