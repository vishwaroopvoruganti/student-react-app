import React, { Component } from 'react';
class EmployeeTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
     //   console.log(this.props);
        console.log('Emp C');
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