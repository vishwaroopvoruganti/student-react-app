import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
    FormGroup,
} from "react-reactive-form";
import {
    ReactiveBase,
    DateRange,
    ResultCard,
    SelectedFilters,
    ReactiveList,
    DatePicker
} from '@appbaseio/reactivesearch';
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
        rememberMe: false,
        mtime: ["", Validators.required]
    });


    componentDidMount() {
        if (this.props.formValues) {
            this.patchValuesIntoForm(this.props.formValues);
        }
    }

    patchValuesIntoForm(formValues) {
        this.loginForm.patchValue({
            username: formValues.username,
            password: formValues.password,
            rememberMe: formValues.rememberMe,
            mtime: formValues.mtime
        });
    }

   
    sub7 = this.loginForm.valueChanges.subscribe(data => {
        console.log('Field changes');
    });

    sub7 = this.loginForm.get('password').valueChanges.subscribe(data => {
        if (this.loginForm.get('password').value) {
            this.loginForm.get('username').setValidators(Validators.compose([Validators.required, this.numberOnlyValidator]));
            this.loginForm.get('username').updateValueAndValidity({ emitEvent: false });
        }
        else {
            this.loginForm.get('username').setValidators([]);
            this.loginForm.get('username').updateValueAndValidity({ emitEvent: false });
        }
    });

    sub7 = this.loginForm.get('mtime').valueChanges.subscribe(data => {
        console.log(this.loginForm.get('mtime').value);
    });

    numberOnlyValidator(control) {
        let isValid = true;
        if (control.value != null && control.value != undefined) {
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
            <ReactiveBase
                app="airbeds-test-app"
                credentials="X8RsOu0Lp:9b4fe1a4-58c6-4089-a042-505d86d9da30"
                type="listing">
                <FieldGroup control={this.loginForm}
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
                            <FieldControl
                                name="mtime"
                                render={({ handler }) => (
                                    <div>
                                        <DatePicker {...handler("DatePicker") }
                                            dataField="mtime"
                                            meta={{ label: Date }}
                                            componentId="DateSensor"
                                            title="DatePickerC"
                                            queryFormat="date"
                                            placeholder="mm-dd-yyyy"
                                            defaultValue={null}
                                            focused={true}
                                            numberOfMonths={1}
                                            showClear={true}
                                            clickUnselectsDay={true}
                                            showFilter={true}
                                            filterLabel="Date"
                                            URLParams={false}
                                        />
                                    </div>
                                )}
                            />
                            <div>
                                {(this.loginForm.controls && this.loginForm.controls['mtime']
                                    && this.loginForm.controls['mtime'].errors
                                    && this.loginForm.controls['mtime'].errors.required) ? <p>This Field is required</p> : null}
                            </div>
                            <button type="button" onClick={this.handleReset}> Reset </button>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                />
            </ReactiveBase>
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
        updateFormValues: (param) => dispatch({ type: LOGIN_FORM_VALUES, value: param })
        // updateSearchResults: (param) => dispatch(searchResults(param)),
        //  loadSpinner: (param) => dispatch({ type: LOADING, value: param })
    };
};
export default connect(mapStateToProps, dispatchStateToProps)(ReactiveForm);

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