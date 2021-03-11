import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';
import './App.css';
import AppRouter from './AppRouter';
import logo from "./logo.svg";

import UserProvider from "./UserProvider";
import Sidebar from "./components/navigation/Sidebar";

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
                                <a href="/profile">Profile Page</a>
                            </div>
                            <div className="url">
                                <a href="/logout">Logout</a>
                            </div>
                        </div>
                    </header>
                )}
                    {!(pageLocation.includes("login") || pageLocation.includes("register")) && (
                        <Sidebar/>
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