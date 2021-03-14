import React from "react";
//import Calendar from 'react-calendar';
//import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, momentLocalizer  } from 'react-big-calendar' 
import moment from 'moment'
import { UserContext } from "../UserProvider";

export default class CalendarPage extends React.Component {
    static contextType = UserContext;

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

    componentDidMount() {
        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/users/tasks/${this.context.uid}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            let tasks = [];
            for (let i = 0; i < data.length; i++) {
                if (data[i].status === "incomplete") {
                    tasks.push({
                        title: data[i].taskName,
                        start: data[i].dateDue,
                        end: data[i].dateDue,
                        allDay: true
                    })
                }

            }

            this.setState({ list: tasks });
        });
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