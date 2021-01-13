import React from "react";

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
                <h1>D3L</h1>
                <p>{pageName}</p>
            </div>
        ); 
    }
}