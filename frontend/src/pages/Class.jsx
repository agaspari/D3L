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
        if (this.context.isFaculty) {
            return <FacultyClass/>;
        } else {
            return <StudentClass/>
        }
    }
}