import React from "react";
import ClassCard from "../components/ClassCard";
import { UserContext } from "../UserProvider";


export default class StudentDashboard extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            classKey: ""
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    enroll = () => {
        const { classKey } = this.state;

        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/student/class/join/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.context.uid,
                classKey
            })    
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;
            const { classes } = this.state;
            classes.push(data);
            this.setState({ classes });
        });
        console.log(`Enrolling with userID ${this.context.uid}`);
    }

    componentDidMount() {
        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/student/classes/${this.context.uid}`, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ classes: data.result });
        });
    }

    render() {
        const { classes, classKey } = this.state;
        console.log(classes, classes.length);
        return (
            <div className="content-container classes">
                <h1>D3L</h1>
                <div className="row">
                    {classes.length > 0 ? (
                        classes.map((class_, index) => (
                            <ClassCard
                                title={class_.className}
                                id={class_.classId}
                                imageIndex={index + 1}
                            />
                        ))
                    ) : (
                        <div>
                            <h5>You are currently not enrolled in any classes. To enroll, please enter class ID and click enroll.</h5>
                            <div>
                                <input
                                    onChange={e => this.onChange(e)}
                                    name="classKey"
                                    value={classKey}
                                    type="text"
                                    placeholder="Class Key"
                                />
                                <button onClick={this.enroll}>Enroll</button>
                            </div>
                        </div>
                    )}
                </div>
                <br/>
                {classes.length > 0 && (
                    <div>
                        <h5>To enroll in more classes, fill out below.</h5>
                        <div>
                            <input
                                onChange={e => this.onChange(e)}
                                name="classKey"
                                value={classKey}
                                type="text"
                                placeholder="Class Key"
                            />
                            <button onClick={this.enroll}>Enroll</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}