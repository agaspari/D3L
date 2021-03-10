import React, { useState, useContext } from "react";
//import { useContext } from 'react';
import { AuthContext } from "../index";
import firebase from 'firebase/app'
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";

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
        const { displayName, email, password, usertype, fname, lname } = this.state;

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, { displayName });
            this.setState({ displayName: '', email: '', password: '', fname: '', lname: '', usertype: '' });
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
        const { email, password, fname, lname, usertype, error } = this.state;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.createUserWithEmailAndPasswordHandler}>
                    <input
                        onChange={e => this.onChange(e)}
                        name="email"
                        value={email}
                        type="email"
                        placeholder="email"
                    />
                    <input
                        onChange={e => this.onChange(e)}
                        name="password"
                        value={password}
                        type="password"
                        placeholder="password"
                    />
                    <input
                        onChange={e => this.onChange(e)}
                        name="fname"
                        value={fname}
                        type="text"
                        placeholder="first name"
                    />
                    <input
                        onChange={e => this.onChange(e)}
                        name="lname"
                        value={lname}
                        type="text"
                        placeholder="last name"
                    />
                    <div>
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
                    <hr />
                    <button type="submit">Register</button>

                    <span>{error}</span>
                </form>
            </div>
        );
    }
}