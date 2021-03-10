import React, {Component} from 'react';
import ProfilePage from "../components/ProfilePage";

class Profile extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="profile-page">
            <ProfilePage/>
            </div>
            
        )
    }
}

export default Profile