import React, { Component } from 'react';
import './App.css';
import FormContainer from './Container/FormContainer';
import Header from './Header.js'
import Edit from './Edit.js';
import {connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import loader from './assets/loader.gif'
import Employee from './Employee/Employee.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsList: [],
      firstName: null,
    };
  }

  componentDidMount(){
    console.log(this.props);
}

  render() {
    return (
    
      <Router>
        
 <div className="App">
{/* 
        {this.props.loading ? <p>LOADING......<p/> : null } */}
       
 
<Header />

{this.props.loading ? 
  <div className="comp-overlay">
    <img 
          style={{marginTop:300, marginBottom:10, marginLeft:40, marginRight: 40, height:100}} 
          src={loader}
          />

{/* <Image
          style={{margin:10, height:10,}}
          source={require('assets/loader.gif')}
        /> */}
  </div>
 : null }

        <Route exact path='/' ></Route>
          <Route exact path='/student' component={FormContainer}></Route>
           <Route exact path='/editStudent/:id' component={Edit}></Route> 
           <Route exact path='/emp' component={Employee}></Route> 
           
      </div>
      
      </Router>
      


     
    );
  }
 

}
const mapStateToProps = state => {
  return {
    loading: state.home.loading
  };
};


export default connect(mapStateToProps)(App);
