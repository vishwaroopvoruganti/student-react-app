import React, { Component } from 'react';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
   // FormGroup,
} from "react-reactive-form";
const TextInput = ({ handler, touched, hasError, meta }) => (
    <div>
        <input  {...handler() } />
    </div>
)
const PasswordInput = ({ handler, touched, hasError, meta }) => (
    <div>
        <input type="password" {...handler() } />
    </div>
)
class StudentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            passwordStrength: false,
            isFormSubmitted: false,
            splCharacter: false,
            confirmPasswordMatch: false,
        }
    }
    passwordResetForm = FormBuilder.group({
        networkId: [""],
        domainId: [""],
        oldPassword: ["", Validators.required],
        newPassword: ["", Validators.required],
        confirmNewPassword: ["", Validators.required]
    })

    componentDidMount() {
        //call patch values from here
    }

    componentWillUnmount() {
    }

    sub6 = this.passwordResetForm.valueChanges.subscribe(formData => {
        if (this.passwordResetForm.value.oldPassword
            || this.passwordResetForm.value.newPassword) {
            this.checkPasswordIsEqual();
        }
    });
    sub7 = this.passwordResetForm.get('newPassword').valueChanges.subscribe(data => {
        if (this.passwordResetForm.get('newPassword').value != null &&
            this.passwordResetForm.get('newPassword').value !== undefined &&
            this.passwordResetForm.get('newPassword').value !== ""
            //&& this.passwordResetForm.get('newPassword').value.length >5
        ) {
            let re = /(?=^.{10,15}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
            if (re.test(this.passwordResetForm.get('newPassword').value)) {
                this.setState({ passwordStrength: true })
            } else {
                this.setState({ passwordStrength: false })
            }
            let splReg = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
            if(splReg.test(this.passwordResetForm.get('newPassword').value)){
                this.setState({splCharacter: true});
            } else {
                this.setState({splCharacter: false});
            }
        } else {
            this.setState({splCharacter: false});
            this.setState({ passwordStrength: false })
        }
    });


    submitForm (e) {
        this.setState({isFormSubmitted: true});
        if(this.passwordResetForm.get('newPassword').value === this.passwordResetForm.get('confirmNewPassword').value) {
            this.setState({confirmPasswordMatch: true});
        } else {
            this.setState({confirmPasswordMatch: false});
        }
     
       // this.setState({isFormSubmitted: true});
        if (this.passwordResetForm.valid &&
            this.checkPasswordIsEqual() &&
            this.state.passwordStrength &&
        this.state.confirmPasswordMatch) { //this will check if the form is valid or not.
                this.setState({isFormSubmitted: false});
                //From here we can do backend call.
                this.setState({confirmPasswordMatch: false});
                this.setState({splCharacter: false});
                this.setState({ passwordStrength: false })
        }
        console.log(this.passwordResetForm.getRawValue());
    }


    checkPasswordIsEqual() {
        let isValid = true;
        this.isPasswordEqual = false;
        if (this.passwordResetForm.value.oldPassword === this.passwordResetForm.value.newPassword) {
            isValid = false;
            this.isPasswordEqual = true;
        }
        return isValid;
    }

    render() {
        return (
            <div><FieldGroup control={this.passwordResetForm}
                render={({ get, invalid }) => (
                    <form onSubmit={this.submitForm.bind(this)}>
                        <FieldControl
                            name="oldPassword"
                            render={PasswordInput}
                            meta={{ label: "oldPassword" }}
                        />
                        <div>
                            {(  this.passwordResetForm.controls 
                                && this.passwordResetForm.controls['oldPassword']
                                && this.passwordResetForm.controls['oldPassword'].errors
                                && this.passwordResetForm.controls['oldPassword'].errors.required 
                                && this.state.isFormSubmitted) ?
                                <p>This Field is required</p> : null}
                        </div>
                        <FieldControl
                        className="field-error"
                            name="newPassword"
                            render={PasswordInput}
                            meta={{ label: "newPassword" }}
                        />
                        <div>
                            {(  this.passwordResetForm.controls 
                                && this.passwordResetForm.controls['newPassword']
                                && this.passwordResetForm.controls['newPassword'].errors
                                && this.passwordResetForm.controls['newPassword'].errors.required 
                                && this.state.isFormSubmitted) ?
                                <p>This Field is required</p> : null}
                        </div>
                        <div>
                            {(this.state.passwordStrength) && !(this.isPasswordEqual) ? <p>Strong</p> : null}
                        </div>
                        <div>
                            {this.isPasswordEqual ? <p>New Password cannot be same as old password</p> : null}
                        </div>
                        <div>
                            {this.state.splCharacter && !this.state.passwordStrength? <p>Special Char</p> : null}
                        </div>
                        <FieldControl
                            name="confirmNewPassword"
                            render={PasswordInput}
                            meta={{ label: "confirmNewPassword" }}
                        />
                        <div>
                            {(  this.passwordResetForm.controls 
                                && this.passwordResetForm.controls['confirmNewPassword']
                                && this.passwordResetForm.controls['confirmNewPassword'].errors
                                && this.passwordResetForm.controls['confirmNewPassword'].errors.required 
                                && this.state.isFormSubmitted) ?
                                <p>This Field is required</p> : null}
                        </div>
                        <div>
                            {this.state.confirmPasswordMatch  ?<p>Password and Confirm Password should be same</p> : null}
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                )}
            /></div>
        )
    }
}

export default StudentTab;