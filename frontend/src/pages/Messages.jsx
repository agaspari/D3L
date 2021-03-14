import React from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import Chat from "../components/Chat";

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const { classId } = this.props.match.params;
        return (
            <div>
                <Chat
                    classId={classId}
                />
            </div>
        ); 
    }
}
