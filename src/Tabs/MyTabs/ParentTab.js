import React, { Component } from 'react';
class ParentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        //   console.log(this.props);
           console.log('Parent C');
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