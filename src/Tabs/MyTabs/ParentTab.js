import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';
class ParentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillUnmount() {
        console.log('Parent destroyed');
    }

    render(){
        return(

            <div>ParentTab</div>
        )
    }

}

export default ParentTab;