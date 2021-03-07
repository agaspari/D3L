import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';


export class Success extends Component {
    continue = e => {
        e.preventDefault();
        //Process Form (Backend)//
        this.props.nextStep();
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    first = e => {
        e.preventDefault();
        this.props.firstStep();
    }

    render() {
        const {values: {firstName, lastName, email, major, bio, preferredContact}} = this.props;
        return (
            <MuiThemeProvider>
                <React.Fragment>
                    <List>
                        <ListItem 
                            primaryText={firstName}
                        />
                        <ListItem 
                            primaryText={lastName}
                        />
                        <ListItem 
                            primaryText={email}
                        />
                        <ListItem 
                            primaryText={major}
                        />
                        <ListItem 
                            primaryText={bio}
                        />
                        <ListItem 
                            primaryText={preferredContact}
                        />
                    </List>
                    <RaisedButton
                        label="Edit Profile"
                        primary={true}
                        style={styles.button}
                        onClick={this.first}
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

export default Success;