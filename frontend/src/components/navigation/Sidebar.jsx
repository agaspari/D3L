import React from "react";
import { UserContext } from "../../UserProvider";
import {Navigation} from 'react-minimal-side-navigation';

export default class Sidebar extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        console.log("From sidebar: ", this.context);

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
                                subNav: [
                                    {
                                        title: 'Class 1',
                                        itemId: '/class/1',
                                    },
                                    {
                                        title: 'Class 2',
                                        itemId: '/class/2',
                                    },
                                    {
                                        title: 'Class 2',
                                        itemId: '/class/3',
                                    },
                                    {
                                        title: 'Class 3',
                                        itemId: '/class/4',
                                    },
                                ],
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
                                itemId: '',
                                subNav: [
                                    {
                                        title: 'CSC 300',
                                        itemId: '/management/teams',
                                    },
                                    {
                                        title: 'Prof. Thomas Muscarelo',
                                        itemId: '/management/teams',
                                    },
                                ],
                            },
                        ]}
                    />
                </>
            </div>
        ); 
    }
}