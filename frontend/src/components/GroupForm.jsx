import React, {Component} from 'react'

class GroupForm extends Component {
    constructor(props) {
        super(props);

        this.state = {title: ''}

        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        this.setState({title: event.target.value});
    };

    addGroup = (event) => {
        event.preventDefault();
        
        this.props.onAddGroup(this.state.title);
    }

    render() {
        return (
            <form onSubmit={this.addGroup}>
                <label>
                    Group Title:
                    <input type="text" value={this.state.title} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default GroupForm;