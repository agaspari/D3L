import React, { Component } from "react";
import './App.css';
import AppRouter from './AppRouter';
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import UserProvider from "./UserProvider";
import { UserContext } from "./UserProvider";
import { useHistory } from "react-router-dom";


class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const pageLocation = window.location.pathname;
        return (
            <div>
                { !(pageLocation.includes("login") || pageLocation.includes("register")) && (
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <div className="urls">
                            <div className="url">
                                <a href="/page1">Profile Page</a>
                            </div>
                            <div className="url">
                                <a href="/page2">URL 2</a>
                            </div>
                            <div className="url">
                                <a href="/page3">URL 3</a>
                            </div>
                        </div>
                    </header>
                )}
                { !(pageLocation.includes("login") || pageLocation.includes("register")) && (
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
                                    itemId: '/another',
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
                )}
                <div className="App">
                    <div>
                        <UserProvider>
                            <AppRouter />
                        </UserProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;