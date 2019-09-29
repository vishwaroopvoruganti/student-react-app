import React, { Component } from 'react';
import './App.css';
import FormContainer from './Container/FormContainer';
import Header from './Header.js'
import Edit from './Edit.js';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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
        {/* <FormContainer /> */}
<Header />
        <Route exact path='/' ></Route>
          <Route exact path='/student' component={FormContainer}></Route>
           <Route exact path='/editStudent/:id' component={Edit}></Route> 
      </div>
      </Router>
     
    );
  }
 

}

export default App;
