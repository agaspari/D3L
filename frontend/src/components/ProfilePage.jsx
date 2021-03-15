import React, { Component } from 'react'
import { UserContext } from "../UserProvider";

class ProfilePage extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)

        this.state = {
            name: "",
            bio: "", 
            major: "",
            isEditing: false
        }
    }

    componentDidMount() {
        fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/users/info/${this.context.uid}`, {
            method: "GET"
        })
        .then(res => res.json())
        .then(data => {
            if (data.result) data = data.result;

            this.setState({ name: data[0].name, bio: data[0].bio, major: data[0].major });
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    handleButton = (e) => {
        e.preventDefault();

        const { name, bio, major, isEditing } = this.state;

        console.log(name, bio, major);

        if (isEditing) {
            fetch(`${window.location.protocol}//${window.location.hostname}:4000/api/users/update/${this.context.uid}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    bio,
                    major
                })
            })
        }
        this.setState({
            isEditing: !isEditing,
        });

    }

    render() {
        const {isEditing} = this.state;
        const {name, bio, major} = this.state;

        return (
            <div className="profile-page">
                <form onSubmit={this.handleButton}>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={name}
                        onChange={(e) => this.onChange(e)} 
                        disabled={!isEditing}/><br/>
                    <label htmlFor="bio">Bio:</label>
                    <input type="text" 
                        id="bio" 
                        name="bio" 
                        value={bio}
                        onChange={(e) => this.onChange(e)} 
                        disabled={!isEditing}/><br/>
                    <label htmlFor="major">Major:</label>
                    <input type="text" 
                        id="major" 
                        name="major" 
                        value={major}
                        onChange={(e) => this.onChange(e)} 
                        disabled={!isEditing}/><br/>
                    <span>
                        {isEditing ? <input type="submit" value="Save"/> : <input type="submit" value="Edit"/>}
                        
                    </span>
                    
                </form>
            </div>
        )
    }
}

export default ProfilePage;

