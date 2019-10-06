import React, { Component } from 'react';
import { render } from "react-dom";
import {
  FormBuilder,
  AbstractControl,
  Validators,
  FormGroup,
  FormArray,
  FieldGroup,
  FieldControl,
  FieldArray
} from "react-reactive-form";
import {connect } from 'react-redux';
import { INCREMENT} from '../actions';
class Employee extends Component {

    constructor(props) {
      super(props);
    }
    productForm = FormBuilder.group({
        customerName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
      });

      passValue(){

      }

       passValue = (param) => {
          this.props.incrementCounter(param);
      }

      render(){
          return(
            <div>
              <button type="submit" onClick={()=>this.passValue(1)}></button>
              {this.props.ctr}
              </div>
          )
      }
}
const mapStateToProps = state => {
  return {
    ctr: state.employee.counter
  };
};

const dispatchStateToProps = dispatch => {
  return {
    incrementCounter: (param) => dispatch({type: INCREMENT, value: param})
  };
};
export default connect(mapStateToProps, dispatchStateToProps)(Employee);



             