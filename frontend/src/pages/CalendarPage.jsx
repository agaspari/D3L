import React from "react";
//import Calendar from 'react-calendar';
//import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import moment from 'moment'

export default class CalendarPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.localizer = momentLocalizer(moment)
        const tempDate = new Date();
        const tempDate2 = new Date();
        tempDate.setDate(tempDate.getDate() +1);
        tempDate2.setDate(tempDate2.getDate()+1);
        tempDate2.setHours(tempDate2.getHours()+1);
        console.log(tempDate,tempDate2);
        this.state = { 
            list:[
                {
                    title: "Hello",
                    start: tempDate,
                    end: tempDate2
                },
                {
                    title: "Hello2",
                    start: new Date(),
                    end: new Date(),
                    allDay: true
                }
            ]

        };
    }

    render() {
        

        return (
            <div style={{ height: '600px'}}>
                <div className="calendar-container">
                    <Calendar
                        localizer= {this.localizer}
                        events={this.state.list}
                        startAccessor="start"
                        endAccessor="end"
                    />
                </div>
            </div>
        ); 
    }
}