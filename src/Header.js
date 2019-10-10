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
          <Link to="/emp"> EMP </Link>
        </li>
        <li>
          <Link to="/student"> Search Results </Link>
        </li>
        <li>
          <Link to="/form"> Forms </Link>
        </li>
        <li>
          <Link to="/center-content"> Center Content Accordians </Link>
        </li>
      </ul>

    )
  }
}

export default Header;