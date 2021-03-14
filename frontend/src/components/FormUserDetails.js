import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormUserDetails extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep();
    }

    render() {
        const {values, handleChange} = this.props;
        
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <TextField 
                        hintText="Enter your First Name"
                        floatingLabelText="First Name"
                        onChange={handleChange('firstName')}
                        defaultValue={values.name}
                    />
                    <br/>
                    <TextField 
                        hintText="Enter your Email"
                        floatingLabelText="Email"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                    />
                    <br/>
                    <TextField 
                        hintText="Enter your Major/minor(s)"
                        floatingLabelText="Major/minor(s)"
                        onChange={handleChange('major')}
                        defaultValue={values.major}
                    />
                    <br/>
                    <TextField 
                        hintText="Enter a little bio about yourself"
                        floatingLabelText="Biography"
                        onChange={handleChange('bio')}
                        defaultValue={values.bio}
                    />
                    <br/>
                    <TextField 
                        hintText="Best way to reach you"
                        floatingLabelText="Preferred Contact Method"
                        onChange={handleChange('preferredContact')}
                        defaultValue={values.preferredContact}
                    />
                    <br/>
                    <RaisedButton
                        label="Continue"
                        primary={true}
                        style={styles.button}
                        onClick={this.continue}
                    />

                </React.Fragment>
            </MuiThemeProvider>
        )
    }
}

const styles = {
    button: {
        margin: 15
    }
}

export default FormUserDetails