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
            error: ""
        };
    }

    // Auth = useContext(AuthContext);

    createUserWithEmailAndPasswordHandler = async (event) => {
        event.preventDefault();
        const { displayName, email, password } = this.state;

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            generateUserDocument(user, { displayName });
            this.setState({ displayName: '', email: '', password: '' });
        } catch(error) {
            this.setState({ error: error.message, password: '' });
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { email, password, error } = this.state;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.createUserWithEmailAndPasswordHandler}>
                    <input
                        value={email}
                        onChange={e => this.onChange(e)}
                        name="email"
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
                    <hr />
                    <button type="submit">Register</button>
            
                    <span>{error}</span>
                </form>
            </div>
        ); 
    }
}