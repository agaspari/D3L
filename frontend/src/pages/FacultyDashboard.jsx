import React, { Component } from 'react'
import { UserContext } from "../UserProvider";
import ClassCard from "../components/ClassCard";

export default class FacultyDashboard extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            className: "",
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    createClass = () => {
        const { className } = this.state;
        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/faculty/class/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                facultyId: this.context.uid,
                className
            })
        })
        .then(res => res.json())
        .then(data => {
            const { classes } = this.state;
            classes.push({
                className: className,
                classCode: data.key
            });

            this.setState({ classes });
        });
    }
    
    componentDidMount() {
        fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/faculty/classes/${this.context.uid}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({ classes: data });
            // const { classes } = this.state;
            // classes.push({
            //     title: className,
            //     classCode: data.key
            // });

            // this.setState({ classes });
        });
    }
    render() {
        // const { groups, students, tasks, assignments, onDeleteStudent, onEditAssignment, onAddStudent, onAddGroup} = this.props
        const { classes, className } = this.state;
        console.log(classes);
        return (
            // <div className="FacultyDashboard">
            //     <StudentList onDeleteStudent={onDeleteStudent} onAddStudent={onAddStudent} onAddGroup={onAddGroup} groups={groups} students={students}/>
            //     <TaskList tasks={tasks}/>
            //     <ToReview onEditAssignment={onEditAssignment} assignments={assignments} students={students}/>
            // </div>
            <div className="content-container classes">
                <h1>D3L</h1>
                <p>StudentDashboard</p>
                {classes.length > 0 && (
                    <div className="row">
                        {classes.map((class_, index) => (
                            <ClassCard
                                title={class_.className}
                                classCode={class_.classCode}
                                id={index}
                                image="https://newevolutiondesigns.com/images/freebies/cool-wallpaper-1.jpg"
                            />
                        ))}
                    </div>
                )}

                <div>
                    <h5>Fill out form below to add class.</h5>
                    <div>
                        <input
                            onChange={e => this.onChange(e)}
                            name="className"
                            value={className}
                            type="text"
                            placeholder="Class Name"
                        />
                        <button onClick={this.createClass}>Create</button>
                    </div>
                </div>
            </div>
        );
    }
}
