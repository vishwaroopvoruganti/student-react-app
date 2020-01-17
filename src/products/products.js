import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';


class Products extends Component {
    constructor(props) {
  
      super(props);
      this.state = {
      }
    }
    componentDidMount() {
        debugger;
        axios.get('getAllProducts').then(response =>{
         //   console.log(response);
        }).catch(error => {
              //  console.log(error);
            }) 
    }

    componentWillMount = () => {
      //console.log(this.props.loginStatus);
    }
    componentDidUpdate() {
      console.log(this.props.loginStatus);
    }
    render() {
        return (
            <div>Hello Products</div>
        )
    }

}
export default connect()(Products);