import React, { Component } from 'react'

class ProfilePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            student: {
                fname: "John", lname: "Doe", email: "jd@gmail.com",
                password: "1234dkjfao", usertype: "student"
            },

            isEditing: false
        }
    }


    onChange = (e) => {
        this.setState({
            student: {
                [e.target.name]: e.target.value,
            }
        });
    }

    handleButton = (e) => {
        e.preventDefault();

        this.setState({
            isEditing: !this.state.isEditing,
        });

        console.log(this.state.student)
    }

    render() {
        const {student, isEditing} = this.state;
        const {fname, lname, password, email} = student;

        return (
            <div>
                <form onSubmit={this.handleButton}>
                    <label>First name:</label>
                    <input 
                        type="text" 
                        name="fname" 
                        value={fname}
                        onChange={(e) => this.onChange(e)} 
                        disabled={!isEditing}/><br/>
                    <label for="lname">Last name:</label>
                    <input type="text" 
                        id="lname"
                        name="lname"
                        value={lname}
                        onChange={(e) => this.onChange(e)} 
                        disabled={!isEditing}/><br/>
                    <label for="email">Email address:</label>
                    <input type="text" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => this.onChange(e)} 
                        disabled={!isEditing}/><br/>
                    <label for="password">Password:</label>
                    <input type="password" 
                        id="password" 
                        name="password" 
                        value={password}
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

