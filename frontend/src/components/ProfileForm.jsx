import React, {Component} from 'react';
import FormUserDetails from './FormUserDetails';
import Confirm from './Confirm';
import Success from './Success';



export class ProfileForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        major: '',
        bio: '',
        preferredContact: ''
    }

    //proceed to next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    //go back to previous step
    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }
    firstStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 2
        });
    }

    //Handle fields change
    handleChange = input => e => {
        this.setState({[input]: e.target.value});
    }


    render() {
        const {step} = this.state;
        const {firstName, lastName, email, major, bio, preferredContact} = this.state;
        const values = {firstName, lastName, email, major, bio, preferredContact}

        switch(step) {
            case 1:
                return (
                    <FormUserDetails
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={values}
                    />
                )
            case 2:
                return (
                    <Confirm
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        values={values}
                    />
                )
            case 3:
                return (<Success 
                        firstStep={this.firstStep}
                        values={values}
                        />
                )
        }
    }

}

export default ProfileForm
