import React from "react";
import Details from "../components/Details";
import { Button, Card } from 'react-bootstrap';


export default class ClassCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { image, title, id } = this.props;

        const DATA = [
            { id: "todo-0", name: "Eat", completed: true },
            { id: "todo-1", name: "Sleep", completed: false },
            { id: "todo-2", name: "Repeat", completed: false }
          ];

        return (
            <div className="col-md-6">
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title> {title} </Card.Title>
                        <Card.Text>
                        </Card.Text>
                        <Button variant="primary" href={`/class/${id}`}>Go</Button>
                    </Card.Body>
                </Card>
            </div>

        );
    }
}