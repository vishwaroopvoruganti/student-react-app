import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Edit extends Component {
    constructor(props) {
        console.log('Constructor called')
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(this.props);
        console.log('Did Mount called');
        console.log(this.props.match.params.id);
    }

    componentWillMount() {
        console.log('Will Mount called');
    }

    render() {
        console.log('Render called');

        return (
            <div>Edit Page working</div>
        )
    }

}

export default Edit;