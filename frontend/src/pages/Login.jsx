import React, { useState, useContext } from "react";
import { auth, signInWithGoogle } from "../firebase";
import { UserContext } from "../UserProvider";
import logo from "../logo.svg";

export default class Login extends React.Component {
    static contextType = UserContext;

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

        auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            window.location.replace("/dashboard");
        }).catch(error => {
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
            <div className="Login">
                <div className="login-container">
                    <h1>Login</h1>
                    <form className="login-form" onSubmit={this.signInWithEmailAndPasswordHandler}>
                        <input
                            value={email}
                            onChange={e => this.onChange(e)}
                            name="email"
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
                        <button className="login-button" type="submit">Login</button>
                        <span>{error}</span>
                    </form>
                    <div className="login-register-option">
                        Don't have an account? <br />
                        <a href="../register">Register here.</a>
                    </div>
                </div>
                <div className="logo-container">
                    <img src={logo} />
                </div>
            </div>
        ); 
    }
}