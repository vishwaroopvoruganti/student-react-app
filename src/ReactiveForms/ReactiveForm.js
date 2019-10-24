import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
} from "react-reactive-form";
import {
    ReactiveBase,
    // DateRange,
    // ResultCard,
    // SelectedFilters,
    // ReactiveList,
    //DataSearch,
    //SingleList,
    DatePicker
} from '@appbaseio/reactivesearch';
import { LOGIN_FORM_VALUES } from '../store/actions';
import isValidNumber from '../utils/validNumber';
const TextInput = ({ handler, touched, hasError, meta }) => (

    <div>
        <input  {...handler() } />
        <span>
            {touched && hasError("required") && `${meta.label} is required`}
        </span>
    </div>

)

class ReactiveForm extends Component {

    loginForm = FormBuilder.group({

        username: [""],

        password: ["", Validators.required],

        rememberMe: false,

        mtime: [null],

        endDate: [null],

        city: [""]

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
            mtime: formValues.mtime,
            endDate: formValues.endDate,
            city: formValues.city
        });

    }
    componentWillUnmount() {
        console.log('Reactive destroyed');
    }

    errorControls(controlName) {
        return this.loginForm.controls[controlName];
    }



    sub7 = this.loginForm.valueChanges.subscribe(data => {

        console.log('Field changes');

    });

    sub6 = this.loginForm.valueChanges.subscribe(formData => {
        console.log('Hello');
        if ((this.loginForm.value.mtime || this.loginForm.value.endDate)) {
            this.loginForm.get('mtime').setValidators(Validators.compose([Validators.required]));
            this.loginForm.get('endDate').setValidators(Validators.compose([Validators.required]));
            this.loginForm.get('mtime').updateValueAndValidity({ emitEvent: false })
            this.loginForm.get('endDate').updateValueAndValidity({ emitEvent: false });

        } else if ((this.loginForm.value.mtime === null && this.loginForm.value.endDate === null) ||
            (this.loginForm.value.mtime === '' && this.loginForm.value.endDate === '')) {
            this.loginForm.get('mtime').setValidators([]);
            this.loginForm.get('endDate').setValidators([]);
            this.loginForm.get('mtime').updateValueAndValidity({ emitEvent: false });
            this.loginForm.get('endDate').updateValueAndValidity({ emitEvent: false });
        }
        this.checkDateRange();


    });



    invalidDateFormat(control) {

        if (control.value) {
            //  console.log(control);
            //  console.log(control.value.getUTCDate());
            //  console.log(control.value.getMonth());
            //  console.log(control.value.getFullYear());

        }

        if (control.value === null || control.value === '') {
            return null;
        } else {
            let isFormatValid =
                control.value !== null && (control.value.getFullYear() !== undefined)
                && (isValidNumber(control.value.getFullYear())
                    && control.value.getFullYear() >= 1900
                    && control.value.getFullYear() <= 9999)
                && (control.value.getMonth() !== undefined)
                && (isValidNumber(control.value.getMonth())
                    && control.value.getMonth() >= 0
                    && control.value.getMonth() <= 12)
                && (control.value.getUTCDate() !== undefined)
                && (isValidNumber(control.value.getUTCDate())
                    && control.value.getUTCDate() >= 0
                    && control.value.getUTCDate() <= 31)
                ;
            let isValid = isFormatValid;
            return isValid ? null : { notValidFormat: true };
        }
    }



    checkDateRange() {

        let isValid = true;

        this.dateErrorMessage = false;
        //console.log(this.loginForm.controls && this.loginForm.controls['mtime'] && this.loginForm.controls['mtime'].value);

        if (this.loginForm.controls['mtime'].value && this.loginForm.controls['endDate'].value &&

            this.loginForm.controls['mtime'].valid && this.loginForm.controls['endDate'].valid) {

            if (new Date(this.loginForm.get('mtime').value) >

                new Date(this.loginForm.get('endDate').value)) {

                isValid = false;

                this.dateErrorMessage = true;

            };

        }

        return isValid;

    }

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

        if (control.value !== null && control.value !== undefined) {

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

        //         const v = 'abc';
        //         function f(fun = x => v){
        //             const v = 'xyz';
        //             console.log(fun());
        //         }
        // f();

        // const a = [];
        // for(var i of ['a', 'b', 'c']){
        //     a.push(() => i);
        // }
        // for (const i of [1, 2,3]){
        //     a.push(()=> i );
        // }
        // console.log(a.map(x => x()));

        // (function(x, f = () => {
        //     return x;
        // }) {
        //     var x;
        //     var y=x;
        //     x='B';
        //     console.log([f(x), y, f()]);
        //     //return [f(x), y, f()];
        // })('A')

        console.log("Form values", this.loginForm.getRawValue());

        console.log("Form Obj", this.loginForm);

        this.props.updateFormValues(this.loginForm.getRawValue());

    }

    


    render() {
        return (
            <div>
            <ReactiveBase
                app="good-books-ds"
                credentials="nY6NNTZZ6:27b76b9f-18ea-456c-bc5e-3a5263ebc63d"
                type="listing">
                <FieldGroup control={this.loginForm}
                    render={({ get, invalid }) => (
                        <form onSubmit={this.handleSubmit}>
                            <FieldControl
                                name="username"
                                render={TextInput}
                                meta={{ label: "Username" }}
                            />
                            <div>
                                {(this.loginForm.controls && this.loginForm.controls['username']
                                    && this.loginForm.controls['username'].errors
                                    && this.loginForm.controls['username'].errors.notnumber) ?
                                    <p>Please enter proper format</p> : null}
                            </div>
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
                                        //  value = {this.errorControls && this.errorControls['mtime'].value !=== ''? this.errorControls['mtime'].value : null}
                                        />
                                    </div>
                                )}
                            />
                            <div>
                                {(this.loginForm.controls && this.errorControls('mtime')
                                    && this.errorControls('mtime').errors
                                    && this.errorControls('mtime').errors.required) ? <p>This Field is required</p> : null}
                            </div>

                            <div>
                                {(this.loginForm.controls && this.errorControls['mtime']
                                    && this.errorControls['mtime'].errors
                                    && this.errorControls['mtime'].errors.notValidFormat) ?
                                    <p>Please enter mm-dd-yyyy</p> : null}
                            </div>
                            <div>
                                {this.dateErrorMessage ? <p>Enter Date lesser than End Date</p> : null}
                            </div>
                            <FieldControl
                                name="endDate"
                                render={({ handler }) => (
                                    <div>
                                        <DatePicker {...handler("DatePicker") }
                                            dataField="endDate"
                                            meta={{ label: Date }}
                                            componentId="endDateSensor"
                                            title="endDatePicker"
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
                                        // value = {this.loginForm.controls && this.loginForm.controls['endDate'].value !=== ''? this.loginForm.controls['endDate'].value : null}

                                        />
                                    </div>
                                )}
                            />
                            <div>
                                {(this.loginForm.controls && this.loginForm.controls['endDate']
                                    && this.loginForm.controls['endDate'].errors
                                    && this.loginForm.controls['endDate'].errors.required) ?
                                    <p>This Field is required</p> : null}
                            </div>
                            <button type="button" onClick={this.handleReset}> Reset </button>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                />
             </ReactiveBase>

             



                
               
             </div>
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

 