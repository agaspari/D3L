import React, { Component } from "react";
import './App.css';
import AppRouter from './AppRouter';
import logo from "./logo.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-calendar/dist/Calendar.css';

class App extends Component {
    render() {
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <div className="urls">
                            <div className="url">
                                <a href="/page1">URL 1</a>
                            </div>
                            <div className="url">
                                <a href="/page2">URL 2</a>
                            </div>
                            <div className="url">
                                <a href="/page3">URL 3</a>
                            </div>
                        </div>
                    </header>
                    <div>
                        <AppRouter />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;