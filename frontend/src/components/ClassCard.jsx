import React from "react";
import { Button, Card } from 'react-bootstrap';


export default class ClassCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { image, title, id } = this.props;

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