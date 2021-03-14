import React from "react";

export default class Details extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { description, dueDate } = this.props;

        return (
            <div class="todoapp stack-large">
                <form class="details_box">
                    <ul>
                        <li>
                            Due: {dueDate}
                        </li>
                        <li>
                            Assigned By:
                        </li>
                        <br/>
                        
                        <li id="description">
                            {description}
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}