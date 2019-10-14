import React, { Component } from 'react';
class StudentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
       // console.log(this.props);
       console.log('Stu C');
    }

    componentWillUnmount() {
        console.log('Student destroyed');
    }

    render(){
        return(
            <div>StudentTab</div>
        )
    }

}

export default StudentTab;