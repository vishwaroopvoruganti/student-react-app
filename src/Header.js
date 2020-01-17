import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
import { LOADING, loginFormValues, loginStatus } from './store/actions';


class Header extends Component {
  constructor(props) {

    super(props);
    // console.log(this.props.loginFormValues);
    this.state = {
    }
  }
  componentDidMount() {
    //console.log(this.props.loginStatus);
  }
  componentWillMount = () => {
    //console.log(this.props.loginStatus);
  }
  componentDidUpdate() {
    // console.log(this.props.loginStatus);
  }
  logout = () => {
    this.props.loadSpinner(true);
    axios.post('el/logout', {}).then((resp) => {
      //  console.log('Logout', resp);
      this.props.loginFormDetails(null);
      sessionStorage.setItem('authorization', null);
      this.props.loginStatus(false);
      this.props.loginFormDetails(null);
      this.props.history.push('/login');
      this.props.loadSpinner(false);
    }).catch(err => {
      this.props.loadSpinner(false);
      //  console.log('Logout Err', err);
    })
  }
  render() {
    let logInLink = null;
    let logOutLink = null;
    if (this.props.loginStatus) {
      logInLink = (
        <div>
          <li>
            <Link to="/login" onClick={this.logout}> Log out </Link>
          </li>
          {/* <li>
            <Link> loggedin as {this.props.loginFormValues.email}</Link>
          </li> */}
        </div>
      );
    } else {
      logOutLink = (
        <div>
          <li>
            <Link to="/login"> Log in </Link>
          </li>
          <li>
            <Link to="/login"> Sign Up </Link>
          </li>
        </div>


      );
    }
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
        <li>
          <Link to="/college"> College </Link>
        </li>
        {logOutLink}
        {logInLink}
        {/* <li>
          <Link to="/college"> Sign Up </Link>
        </li> */}
        {/* {this.props.loginStatus ?
          <div>
            <li>
              <Link to="/login"> Log out </Link>
            </li>
            <li>
              <Link> loggedin as {this.props.loginFormValues.email}</Link>
            </li>
          </div>
          :
          <li>
            <Link to="/login"> Log in </Link>
          </li>
        } */}

      </ul>

    )
  }
}


//app level store
const mapStateToProps = state => {
  return {
    loginFormValues: state.home.loginFormValues,
    loginStatus: state.home.loginStatus,
  };
};

const dispatchStateToProps = dispatch => {
  return {
    loginFormDetails: (param) => dispatch(loginFormValues(param)),
    loginSucessfull: (param) => dispatch(loginStatus(param)),
    loadSpinner: (param) => dispatch({ type: LOADING, value: param }),
  };
};


export default connect(mapStateToProps, dispatchStateToProps)(Header);