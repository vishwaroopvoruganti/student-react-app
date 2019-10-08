import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";
import { LOGIN_FORM_VALUES } from '../store/actions';

const TextInput = ({ handler, touched, hasError, meta }) => (
    <div>
        <input  {...handler() } />
        <span>
            {touched
                && hasError("required") 
                && `${meta.label} is required`}
        </span>
    </div>
)
 class ReactiveForm extends Component {
    loginForm = FormBuilder.group({
        username: [""],
        password: ["", Validators.required],
        rememberMe: false
    });

    componentDidMount(){
       if(this.props.formValues){
           this.patchValuesIntoForm(this.props.formValues);
       }
      }

      patchValuesIntoForm(formValues){
          this.loginForm.patchValue({
            username: formValues.username,
            password: formValues.password,
            rememberMe: formValues.rememberMe
          });
      }

    


    //   sub6 = this.caFilterForm.valueChanges.subscribe(formData => {
    //     if ((this.caFilterForm.value.beginDate || this.caFilterForm.value.endDate)) {
    //       this.caFilterForm.get('beginDate').setValidators(Validators.compose([Validators.required, invalidDateFormat]));
    //       this.caFilterForm.get('endDate').setValidators(Validators.compose([Validators.required, , invalidDateFormat]));
    //       this.caFilterForm.get('beginDate').updateValueAndValidity({ emitEvent: false })
    //       this.caFilterForm.get('endDate').updateValueAndValidity({ emitEvent: false });

    //     } else if (this.caFilterForm.value.effFromDt == null && this.caFilterForm.value.effToDt == null) {
    //       this.caFilterForm.get('beginDate').setValidators([]);
    //       this.caFilterForm.get('endDate').setValidators([]);
    //       this.caFilterForm.get('beginDate').updateValueAndValidity({ emitEvent: false });
    //       this.caFilterForm.get('endDate').updateValueAndValidity({ emitEvent: false });


    //     }
    //     this.checkDateRange();


    //   });
    sub7 = this.loginForm.valueChanges.subscribe(data => {
        console.log('Field changes');
    });

    sub7 = this.loginForm.get('password').valueChanges.subscribe(data => {
        console.log('PassWord Changes');
            this.loginForm.get('username').setValidators(Validators.compose([Validators.required, this.numberOnlyValidator]));
            this.loginForm.get('username').updateValueAndValidity({ emitEvent: false });
        // } else {
            // this.loginForm.get('username').setValidators([]);
            // this.loginForm.get('username').updateValueAndValidity({ emitEvent: false });
       // }
       

    });
      numberOnlyValidator(control) {
        let isValid = true;
        if(control.value != null && control.value != undefined){
          let regx = RegExp('^[0-9]*$')
          isValid = regx.test(control.value);
      
        }
      return isValid ? null : { notnumber: true };
      }
    handleReset = () => {
        this.loginForm.reset();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form values", this.loginForm.getRawValue());
        console.log("Form Obj", this.loginForm);
        this.props.updateFormValues(this.loginForm.getRawValue());
    }
    render() {
        return (
            <FieldGroup
                control={this.loginForm}
                render={({ get, invalid }) => (
                    <form onSubmit={this.handleSubmit}>

                        <FieldControl
                            name="username"
                            render={TextInput}
                            meta={{ label: "Username" }}
                        />

                        <FieldControl
                            name="password"
                            render={TextInput}
                            meta={{ label: "Password" }}
                        />

                        <FieldControl
                            name="rememberMe"
                            render={({ handler }) => (
                                <div>
                                    <input {...handler("checkbox") } />
                                </div>
                            )}
                        />
                        <button
                            type="button"
                            onClick={this.handleReset}
                        >
                            Reset
                    </button>
                        <button
                            type="submit"

                        >
                            Submit
                    </button>
                    </form>
                )}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        formValues: state.home.formValues,
       // studentsList: state.student.results
    };
};

const dispatchStateToProps = dispatch => {
    return {
         updateFormValues: (param) => dispatch({type: LOGIN_FORM_VALUES, value: param})

       // updateSearchResults: (param) => dispatch(searchResults(param)),
      //  loadSpinner: (param) => dispatch({ type: LOADING, value: param })
    };
};
export default connect(mapStateToProps, dispatchStateToProps)(ReactiveForm);