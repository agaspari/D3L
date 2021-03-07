import React, { useState, useContext } from "react";
// import { AuthContext } from "../index";
import firebase from 'firebase/app'
import { auth, signInWithGoogle } from "../firebase";
import { UserContext } from "../UserProvider";

export default class Login extends React.Component {
    static contextType = UserContext; // Todo: Figure out how this works exactly. (ReactJS Context)

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    //Auth = useContext(AuthContext);

    signInWithEmailAndPasswordHandler = (event) => {
        event.preventDefault();

        const { email, password } = this.state;

        auth.signInWithEmailAndPassword(email, password).catch(error => {
            this.setState({ error });
            console.error("Error signing in with password and email", error);
        });
    };
  
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        console.log(this.context);
        const { email, password, error } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.signInWithEmailAndPasswordHandler}>
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
                    <button onClick={signInWithGoogle} className="googleBtn" type="button">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="logo"
                    />
                        Login With Google
                    </button>
                    <button type="submit">Login</button>
                    <span>{error}</span>
                </form>
            </div>
        ); 
    }
}