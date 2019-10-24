import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    SingleDropdownList,
   // CategorySearch,
    MultiList,
    ReactiveBase,
    DataSearch,
    DatePicker,
    SingleList,
    //ReactiveList,
    SelectedFilters
} from '@appbaseio/reactivesearch';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
    FormGroup,
} from "react-reactive-form";
import { REACTIVE_SEARCH_FORM_VALUES } from '../store/actions';

class EmployeeTab extends Component {
    loginForm = FormGroup;
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    loginForm = FormBuilder.group({
        ds: [""],
        sl: [""],
        ml: [""],
        price: [""],
        startDate: [""],
        endDate: [""]
    });


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.loginForm);
        this.props.updateFormValues(this.loginForm.getRawValue());
    }

    componentDidMount() {
        console.log('Emp C');
        if (this.props.formValues) {

            this.patchValuesIntoForm(this.props.formValues);

        }
    }

    errorControls(controlName) {
        return this.loginForm.controls[controlName];
    }

    patchValuesIntoForm(formValues) {
        this.loginForm.patchValue({
            ds: formValues.ds,
            sl: formValues.sl,
            ml: formValues.ml,
            price: formValues.price,
            startDate: formValues.startDate,
            endDate: formValues.endDate
        });
    }

    componentWillUnmount() {
        console.log('Emp destroyed');
    }

    sub6 = this.loginForm.valueChanges.subscribe(formData => {
        console.log(this.loginForm);
        if ((this.loginForm.value.startDate || this.loginForm.value.endDate)) {
            this.loginForm.get('startDate').setValidators(Validators.compose([Validators.required]));
            this.loginForm.get('endDate').setValidators(Validators.compose([Validators.required]));
            this.loginForm.get('startDate').updateValueAndValidity({ emitEvent: false })
            this.loginForm.get('endDate').updateValueAndValidity({ emitEvent: false });

        } else if ((this.loginForm.value.startDate === null && this.loginForm.value.endDate === null) ||
            (this.loginForm.value.startDate === '' && this.loginForm.value.endDate === '')) {
            this.loginForm.get('startDate').setValidators([]);
            this.loginForm.get('endDate').setValidators([]);
            this.loginForm.get('startDate').updateValueAndValidity({ emitEvent: false });
            this.loginForm.get('endDate').updateValueAndValidity({ emitEvent: false });
        }
        this.checkDateRange();
        console.log('Hello');
        this.props.updateFormValues(this.loginForm.getRawValue());

    });

    checkDateRange() {

        let isValid = true;

        this.dateErrorMessage = false;
        //console.log(this.loginForm.controls && this.loginForm.controls['startDate'] && this.loginForm.controls['startDate'].value);

        if (this.loginForm.controls['startDate'].value && this.loginForm.controls['endDate'].value &&

            this.loginForm.controls['startDate'].valid && this.loginForm.controls['endDate'].valid) {

            if (new Date(this.loginForm.get('startDate').value) >

                new Date(this.loginForm.get('endDate').value)) {

                isValid = false;

                this.dateErrorMessage = true;

            };

        }

        return isValid;

    }
    render() {
        return (
            <div>
                <ReactiveBase
                    app="products"
                    url="http://localhost:9200">
                    <FieldGroup control={this.loginForm}
                        render={({ get, invalid }) => (
                            <form onSubmit={this.handleSubmit}>
                                <FieldControl
                                    name="ds"
                                    render={({ handler }) => (
                                        <div>
                                            <DataSearch {...handler("DataSearch")}
                                                componentId="SearchSensor"
                                                dataField={["name"]}
                                                title="Data Search"
                                                defaultValue=""
                                                fieldWeights={[1, 3]}
                                                placeholder="Search for cities or venues"
                                                autosuggest={true}
                                                highlight={true}
                                                highlightField="studentName"
                                                queryFormat="and"
                                                fuzziness={0}
                                                debounce={100}
                                                react={{
                                                    and: ["CategoryFilter", "SearchFilter"]
                                                }}
                                                showFilter={true}
                                                filterLabel="Venue filter"
                                                URLParams={false}
                                                loader = {true}
                                            />
                                        </div>
                                    )}
                                />
                                <FieldControl
                                    name="sl"
                                    render={({ handler }) => (
                                        <div>
                                            <SingleList {...handler("SingleList") }
                                                componentId="CitySensor"
                                                dataField="in_stock"                                                
                                                size={100}
                                                sortBy="count"
                                                title="S L"
                                                defaultValue=""
                                               
                                              
                
                                                queryFormat="or"
                                                selectAllLabel="All Cities"
                                                showRadio={true}
                                                showCount={true}
                                                showSearch={true}
                                                placeholder="Single List"
                                                react={{
                                                    and: ['SearchSensor', 'CitySensor','MultiCitySensor', 'PriceSensor' ]
                                                }}
                                                showFilter={false}
                                                filterLabel="City"
                                                URLParams={false}
                                                loader="Loading ..."
                                            />
                                        </div>
                                    )}
                                />
                                <FieldControl
                                    name="ml"
                                    render={({ handler }) => (
                                        <div>
                                            <MultiList {...handler("MultiList") }
                                                componentId="MultiCitySensor"
                                                dataField="name.keyword"
                                                title="Multi List"
                                                size={100}
                                                sortBy="asc"
                                                defaultValue={[]} 
                                                queryFormat="or"
                                                selectAllLabel="All Cities"
                                                showCheckbox={true}
                                                showCount={true}
                                                showSearch={true}
                                                placeholder="Multi List"
                                                react={{
                                                    and: ['SearchSensor', 'CitySensor','MultiCitySensor', 'PriceSensor' ]
                                                }}
                                                showFilter={true}
                                                filterLabel="City"
                                                URLParams={false}
                                                loader="Loading ..."
                                            />
                                        </div>
                                    )}
                                />
                                <FieldControl
                                    name="price"
                                    render={({ handler }) => (
                                        <div>
                                            <SingleDropdownList {...handler("SingleDropdownList") }
                                                componentId="PriceSensor"
                                                dataField="price"
                                                title="Single Dropdown List"
                                                size={100}
                                                sortBy="count"
                                                defaultValue=""
                                                queryFormat="or"
                                                showCount={true}
                                                placeholder="Single Dropdown List"
                                                selectAllLabel="All"
                                                // react={{
                                                //     and: ['SearchSensor', 'CitySensor','MultiCitySensor', 'PriceSensor' ]
                                                // }}
                                                showFilter={true}
                                                filterLabel="City"
                                                URLParams={false}
                                                loader="Loading ..."
                                            />
                                        </div>
                                    )}
                                />
                                 {/* <FieldControl
                                name="startDate"
                                render={({ handler }) => (
                                    <div>
                                        <DatePicker {...handler("DatePicker") }
                                            dataField="startDate"
                                            meta={{ label: Date }}
                                            componentId="DateSensor"
                                            title="DatePickerC"
                                            queryFormat="date"
                                            placeholder="mm-dd-yyyy"
                                            defaultValue={null}
                                            focused={false}
                                            numberOfMonths={1}
                                            showClear={true}
                                            clickUnselectsDay={true}
                                            showFilter={true}
                                            filterLabel="Date"
                                            URLParams={false}
                                        //  value = {this.errorControls && this.errorControls['startDate'].value !=== ''? this.errorControls['startDate'].value : null}
                                        />
                                    </div>
                                )}
                            />

                             <div>
                                {(this.loginForm.controls && this.errorControls('startDate')
                                    && this.errorControls('startDate').errors
                                    && this.errorControls('startDate').errors.required) ? <p>This Field is required</p> : null}
                            </div>

                             <div>
                                {(this.loginForm.controls && this.errorControls['startDate']
                                    && this.errorControls['startDate'].errors
                                    && this.errorControls['startDate'].errors.notValidFormat) ?
                                    <p>Please enter mm-dd-yyyy</p> : null}
                            </div>
                            <div>
                                {this.dateErrorMessage ? <p>Enter Date lesser than End Date</p> : null}
                            </div>   */}
                            {/* <FieldControl
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
                                            focused={false}
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
                            </div> */}
                            </form>
                        )}
                    />
                    <SelectedFilters />
                </ReactiveBase>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        formValues: state.tab.reactiveSearchFormValues,
    };
};

const dispatchStateToProps = dispatch => {
    return {
        updateFormValues: (param) => dispatch({ type: REACTIVE_SEARCH_FORM_VALUES, value: param })
    };
};
export default connect(mapStateToProps, dispatchStateToProps)(EmployeeTab);
