import React from "react";
import { UserContext } from "../../UserProvider";
import {Navigation} from 'react-minimal-side-navigation';
import Cookies from 'universal-cookie';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            classes: [],
            classesMessaging: []
        };
    }

    componentDidMount() {
        const cookies = new Cookies();

        let url = cookies.get("userType") === "faculty" ? `${window.location.protocol}//${window.location.hostname}:4000/api/faculty/classes/${cookies.get('userId')}` : `${window.location.protocol}//${window.location.hostname}:4000/api/student/classes/${cookies.get('userId')}`;
        console.log("URL: ", url);
        fetch(url, {
            method: "GET",
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.result) data = data.result;
            
            let classes = [];
            let classesMessages = [];
            for (let i = 0; i < data.length; i++) {
                classes.push({
                    title: data[i].className,
                    itemId: `/class/${data[i].classId}`
                });
                classesMessages.push({
                    title: data[i].className,
                    itemId: `/class/messages/${data[i].classId}`
                });
            }
            this.setState({ classes, classesMessages });
        });
    }

    render() {
        const { classes, classesMessages } = this.state;
        return (    
            <div id="sidebar">
                <>
                    <Navigation
                        // you can use your own router's api to get pathname
                        activeItemId="/management/members"
                        onSelect={({itemId}) => {
                            if (itemId) {
                                window.location.href = itemId;
                            }
                        }}
                        items={[
                            {
                                title: 'Dashboard',
                                itemId: '/StudentDashboard',
                            },
                            {
                                title: 'Classes',
                                subNav: classes,
                            },
                            {
                                title: 'Resources',
                                itemId: '/dashboard',
                            },
                            {
                                title: 'Calendar',
                                itemId: '/calendar',
                            },
                            {
                                title: 'Messages',
                                subNav: classesMessages
                            },
                        ]}
                    />
                </>
            </div>
        ); 
    }
}