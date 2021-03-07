import React from "react";
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <div>
                
                <h1>D3L</h1>
                <p>Body Text goes Here</p>

            </div>
        ); 
    }
}
