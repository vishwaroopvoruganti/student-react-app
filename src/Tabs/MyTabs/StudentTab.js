import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';
class StudentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillUnmount() {
        console.log('destroyed');
    }

    render(){
        return(
            <div>StudentTab</div>
        )
    }

}

export default StudentTab;