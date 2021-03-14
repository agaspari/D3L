  
import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "./firebase";

export const UserContext = createContext({ user: null });

export default class UserProvider extends Component {
    state = {
        user: null,
        loading: true
    };

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            const user = await generateUserDocument(userAuth);

            this.setState({ user, loading: false });
        });
    };

    render() {
        const { user, loading } = this.state;

        if (loading) {
            return null;
        }

        return (
            <div className='main'>
                <UserContext.Provider value={user}>
                    {this.props.children}
                </UserContext.Provider>
            </div>
        );
    }
}