import React from "react";
import FacultyClass from './FacultyClass';
import StudentClass from './StudentClass';
import { UserContext } from "../UserProvider";

export default class Class extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render() {
        const { id } = this.props.match.params;

        if (this.context.isFaculty) {
            return (
                <FacultyClass
                    classId={id}
                />
            );
        } else {
            return (
                <StudentClass
                    classId={id}
                />
            );
        }
    }
}