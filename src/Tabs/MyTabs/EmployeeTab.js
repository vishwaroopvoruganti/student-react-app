import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';
class EmployeeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillUnmount() {
        console.log('Emp destroyed');
    }

    render(){
        return(
            <div>EmployeeTab</div>
        )
    }

}

export default EmployeeTab;