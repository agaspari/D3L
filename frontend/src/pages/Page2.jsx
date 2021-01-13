import React from "react";

export default class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            pageName: "Page 2"
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