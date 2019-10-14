import React, { Component } from 'react';
import {
  FormBuilder,
  Validators,
} from "react-reactive-form";
import { connect } from 'react-redux';
import { increment } from './store/actions';
class Employee extends Component {

  productForm = FormBuilder.group({
    customerName: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  });

  passValue() {

  }

  passValue = (param) => {
    this.props.incrementCounter(param);
  }

  render() {
    return (
      <div>
        <button type="submit" onClick={() => this.passValue(1)}></button>
        {this.props.ctr}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    ctr: state.employee.counter,
  };
};

const dispatchStateToProps = dispatch => {
  return {
    //  incrementCounter: (param) => dispatch({type: INCREMENT, value: param})
    // line 51 and 53 are equalent 51 is the way to dispatch action without using thunk and(or) action creators
    incrementCounter: (param) => dispatch(increment(param))
    //line 53 is the way we dispatch actions when using action creators and(or) thunk
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Employee);



