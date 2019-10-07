import React, { Component } from 'react';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";

const TextInput = ({ handler, touched, hasError, meta }) => (
  <div>
    <input  {...handler()}/>
    <span>
        {touched
        && hasError("required")
        && `${meta.label} is required`}
    </span>
  </div>  
)
export default class Login extends Component {
    loginForm = FormBuilder.group({
        username: ["", Validators.required],
        password: ["", Validators.required],
        rememberMe: false
      });


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
    sub7= this.loginForm.valueChanges.subscribe(data => {
        console.log('Field changes');
         });
  
  sub7= this.loginForm.get('password').valueChanges.subscribe(data => {
     console.log('PassWord Changes');
      });

    handleReset=() => {
        this.loginForm.reset();
    }
    handleSubmit=(e) => {
        e.preventDefault();
        console.log("Form values", this.loginForm.getRawValue());
        console.log("Form Obj", this.loginForm);
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
                      render={({handler}) => (
                        <div>
                          <input {...handler("checkbox")}/>
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
                      disabled={invalid}
                    >
                      Submit
                    </button>
                  </form>
                )}
              />
        );
    }
}