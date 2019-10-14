import React, { Component, Suspense } from 'react';
import './App.css';
// import FormContainer from './Container/FormContainer';
import Header from './Header.js'
import asyncComponent from './hoc/asyncComponent';
import Edit from './Edit.js';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import loader from './assets/loader.gif'
import Employee from './Employee/Employee.js';
import { LOADING } from './store/actions';
import CustomeTabs from './Tabs/CustomeTabs';
const asyncReactiveForms = asyncComponent(() => {
  return import('./ReactiveForms/ReactiveForm');
});
const FormContainer = React.lazy(() => import('./Container/FormContainer'));
const CenterContent = React.lazy(() => import('./CenterContent/CenterContent'));
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentsList: [],
      firstName: null,
    };
  }

  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      
      <BrowserRouter>
        <React.Fragment>
          <div className="App">
            <Header />
            {this.props.loading ?
              <div className="comp-overlay">
                <img  alt="description"
                      style={{ 
                              marginTop: 300, 
                              marginBottom: 10, 
                              marginLeft: 40, 
                              marginRight: 40, 
                              height: 100 
                            }}
                            
                  src={loader} />
              </div> : null}
            <Route exact path='/' ></Route>
            {/* Advanced way to implement lazy loading */}
            {/* see how to pass function from the fallback */}
            <Route path='/student' render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <FormContainer />
              </Suspense>
              )}
            />
            <Route exact path='/editStudent/:id' component={Edit}></Route>
            <Route exact path='/emp' component={Employee}></Route>
            {/* Old way to implement lazy routing usin hoc */}
            <Route exact path='/form' component={asyncReactiveForms}></Route>
            <Route exact path='/tab-content' component={CustomeTabs}></Route>
            <Route path='/center-content' render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <CenterContent />
              </Suspense>
              )}
            />
          </div>
        </React.Fragment>
      </BrowserRouter>
    );
  }


}
const mapStateToProps = state => {
  return {
    loading: state.home.loading
  };
};

const dispatchStateToProps = dispatch => {
  return {
    //loadSpinner: (param) => dispatch({type: LOGIN_FORM_VALUES, value: param})
    // updateSearchResults: (param) => dispatch(searchResults(param)),
      loadSpinner: (param) => dispatch({ type: LOADING, value: param })
  };
};


export default connect(mapStateToProps, dispatchStateToProps)(App);
