import React, { useState, useContext } from "react";
//import { useContext } from 'react';
import { AuthContext } from "../index";
import firebase from 'firebase/app'
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import logo from "../logo.svg"

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            usertype: "",
            fname: "",
            lname: ""
        };
    }

    // Auth = useContext(AuthContext);

    createUserWithEmailAndPasswordHandler = async (event) => {
        event.preventDefault();
        const { email, password, usertype, fname, lname } = this.state;

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, { usertype, fname, lname, });
            this.setState({ email: '', password: '', fname: '', lname: '', usertype: '' });
        } catch (error) {
            this.setState({ error: error.message, password: '' });
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { email, password, fname, lname, error } = this.state;
        return (
            <div className="Login">
                <div className="login-container">
                    <h1>Register</h1>
                    <form className="login-form" onSubmit={this.createUserWithEmailAndPasswordHandler}>
                        <input
                            onChange={e => this.onChange(e)}
                            name="email"
                            value={email}
                            type="email"
                            placeholder="email"
                        />
                        <br/>
                        <input
                            onChange={e => this.onChange(e)}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="password"
                        />
                        <br/>
                        <input
                            onChange={e => this.onChange(e)}
                            name="fname"
                            value={fname}
                            type="text"
                            placeholder="first name"
                        />
                        <br/>
                        <input
                            onChange={e => this.onChange(e)}
                            name="lname"
                            value={lname}
                            type="text"
                            placeholder="last name"
                        />
                        <br/>
                        <div className="usertype-buttons">
                            <input
                                type="radio"
                                id="radiobutton1"
                                name="usertype"
                                value="faculty" />
                            <label for="radiobutton1">Faculty</label>
                            <input
                                type="radio"
                                id="radiobutton2"
                                name="usertype"
                                value="student" />
                            <label for="radiobutton2">Student</label>
                        </div>
                        <button className="login-button" type="submit">Register</button>
                        <br/>
                        <span className="error">{error}</span>
                    </form>
                    <br/>
                    <div className="login-register-option">
                        Already have an account? <br />
                        <a href="../login">Login here.</a>
                    </div>
                </div>
                <div className="logo-container">
                    <img src={logo} />
                </div>
            </div>
        );
    }
}