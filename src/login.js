import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginFormValues, LOADING, loginStatus } from './store/actions';
import { TextInput, PasswordInput } from './utils/input';
import axios from 'axios';
import { FormBuilder, FieldGroup, FieldControl, Validators } from "react-reactive-form";


class Login extends Component {

    loginForm = FormBuilder.group({
        email: [""],
        password: [""]
    });


    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        if (this.props.loginFormValues) {
            //this.patchValuesIntoForm(this.props.loginFormValues);
        }
    }
    patchValuesIntoForm(formValues) {
        console.log('Patch Values', formValues);
        this.loginForm.patchValue({
            email: formValues.email,
            password: formValues.password,
        });
    }

    handleSubmit = (e) => {

        e.preventDefault();
        this.props.loadSpinner(true);
        axios.post('el/login',
            this.loginForm.getRawValue())
            .then(response => {
                //  console.log(response);
                sessionStorage.setItem('authorization', response.data.token);
                this.props.loginFormDetails(this.loginForm.getRawValue());
                this.props.loginSucessfull(true);
                this.props.history.push('/products');
                this.props.loadSpinner(false);
            }
            // , err => {
            //     console.log('UI MSG LOG IN FAILED');
            //     this.props.loadSpinner(false);
            // }
            ).catch(error => {
                this.props.loadSpinner(false);
                console.log(error.message);
            })
    }

    handleReset = (e) => {
        e.preventDefault();
        this.loginForm.reset();
    }


    render() {
        return (
            <div>
                <p>13user@gmail.com</p>
                <p>test@44629</p>
                <FieldGroup control={this.loginForm}
                    render={({ get, invalid }) => (
                        <form onSubmit={this.handleSubmit}>
                            <label>*User Name:</label>
                            <FieldControl
                                name="email"
                                render={TextInput}
                                meta={{ label: "email" }}
                            />
                            <label>*Password:</label>
                            <FieldControl
                                name="password"
                                render={PasswordInput}
                                meta={{ label: "Password" }}
                            />
                            <button type="button" onClick={this.handleReset}> Reset </button>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loginFormValues: state.home.loginFormValues,
    };
};

const dispatchStateToProps = dispatch => {
    return {
        loginFormDetails: (param) => dispatch(loginFormValues(param)),
        loginSucessfull: (param) => dispatch(loginStatus(param)),
        loadSpinner: (param) => dispatch({ type: LOADING, value: param }),
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(Login);