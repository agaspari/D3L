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
            usertype: false,
            firstname: "",
            lastname: ""
        };
    }

    // Auth = useContext(AuthContext);

    createUserWithEmailAndPasswordHandler = async (event) => {
        event.preventDefault();
        const { email, password, usertype, firstname, lastname } = this.state;

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, { isFaculty: usertype, firstname, lastname, });
            fetch (`${window.location.protocol}//${window.location.hostname}:4000/api/users`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: user.uid,
                    firstname,
                    lastname,
                    email,
                    password,
                    role: usertype ? "faculty" : "student"
                })
            });
            this.setState({ email: '', password: '', firstname: '', lastname: '', usertype: '' });
        } catch (error) {
            this.setState({ error: error.message, password: '' });
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSelect = (isFaculty) => {
        this.setState({ usertype: isFaculty ? true : false });
    }


    render() {
        const { email, password, firstname, lastname, error, usertype } = this.state;
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
                            placeholder="Email"
                        />
                        <br/>
                        <input
                            onChange={e => this.onChange(e)}
                            name="password"
                            value={password}
                            type="password"
                            placeholder="Password"
                        />
                        <br/>
                        <input
                            onChange={e => this.onChange(e)}
                            name="firstname"
                            value={firstname}
                            type="text"
                            placeholder="First Name"
                        />
                        <br/>
                        <input
                            onChange={e => this.onChange(e)}
                            name="lastname"
                            value={lastname}
                            type="text"
                            placeholder="Last Name"
                        />
                        <br/>
                        <div className="usertype-buttons">
                            <input
                                type="radio"
                                id="radio-faculty"
                                name="usertype"
                                checked={usertype}
                                onChange={() => this.onSelect(true)}
                            />
                            <label htmlFor="radio-faculty">Faculty</label>
                            <input
                                type="radio"
                                id="radio-student"
                                name={"usertype"}
                                checked={!usertype}
                                onChange={() => this.onSelect(false)}
                            />
                            <label htmlFor="radio-student">Student</label>
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