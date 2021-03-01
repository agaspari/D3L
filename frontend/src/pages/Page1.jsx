import React from "react";
import ProfileForm from "../components/ProfileForm";

export default class Page1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pageName: "Page 1"
        };
    }

    render() {
        const { pageName } = this.state;

        return (
            <div>
               <ProfileForm/>
            </div>
        ); 
    }
}