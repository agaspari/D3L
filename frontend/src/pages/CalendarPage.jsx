import React from "react";
import Calendar from 'react-calendar';

export default class CalendarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
    
        };
    }

    render() {

        return (
            <div>
                <h1>D3L</h1>
                <Calendar calendarType = "US" locale = "en-US" />
            </div>
        ); 
    }
}