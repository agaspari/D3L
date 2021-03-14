import React, {Component} from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm';
import Success from './Success';



export class ProfileForm extends Component {
    state = {
        step: 1,
        namee: '',
        major: '',
        bio: '',
        preferredContact: ''
    }

    //Handle fields change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }


    render() {
        const {step} = this.state;
        const {name, major, bio, preferredContact} = this.state;
        const values = {name, major, bio, preferredContact}

        return (
            <FormUserDetails
                nextStep={this.nextStep}
                handleChange={this.handleChange}
                values={values}
            />
        )
    }

}

export default ProfileForm
