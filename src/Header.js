import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Header extends Component {
  constructor(props) {
    
    super(props);
    this.state = {

    }
  }
  com
  render() {
    return (
    
        <ul>
          <li>
            <Link to="/"> Home </Link>
          </li>
          <li>
            <Link to="/student"> About </Link>
          </li>
          <li>
            <Link to="/form"> Forms </Link>
          </li>
        </ul>
       
          )
}
}

export default Header;