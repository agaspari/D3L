import React from "react";
import ClassCard from "../components/ClassCard";
import { UserContext } from "../UserProvider";


export default class StudentDashboard extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            classId: ""
        };
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    enroll = () => {
        console.log(`Enrolling with userID ${this.context.uid}`);
    }

    render() {
        const { classes, classId } = this.state;
        console.log("From dashboard: ", this.context);
        return (
            <div className="content-container classes">
                <h1>D3L</h1>
                <p>StudentDashboard</p>
                <div className="row">
                    {classes.length > 0 ? (
                        classes.forEach((class_, index) => (
                            <ClassCard
                                title={class_.title}
                                id={index}
                                image="https://newevolutiondesigns.com/images/freebies/cool-wallpaper-1.jpg"
                            />
                        ))
                    ) : (
                        <div>
                            <h5>You are currently not enrolled in any classes. To enroll, please enter class ID and click enroll.</h5>
                            <div>
                                <input
                                    onChange={e => this.onChange(e)}
                                    name="classId"
                                    value={classId}
                                    type="text"
                                    placeholder="Class ID"
                                />
                                <button onClick={this.enroll}>Enroll</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}