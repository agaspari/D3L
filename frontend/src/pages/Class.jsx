import React from "react";

export default class Class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageName: "Class"
        };
    }

    render() {
        const { id } = this.props.match.params;
        const { pageName } = this.state;

        return (
            <div>
                <h1>D3L</h1>
                <p>{pageName}</p>
                <p> {id} </p>
            </div>
        );
    }
}