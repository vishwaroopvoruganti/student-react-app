import React, { Component } from 'react';
import Input from '../Form/Input.js';
import Button from '../Form/Button.js';
import Select from '../Form/Select.js';
import ResultContainer from './ResultContainer.js';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    Link
} from 'react-router-dom';
import { SEARCH_RESULTS, DATA_TO_UPDATE } from '../actions';
import { searchResults } from './store/actions';
import { LOADING } from '../store/actions';
class FormContainer extends Component {
    constructor(props) {
        super(props);
        this.handleStudentSearchClick = this.handleStudentSearchClick.bind(this);
        this.handleRowClick = this.handleRowClick.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.state = {
            studentsList: [],
            user: {
                lastName: '',
                email: '',
                state: ''
            },
            states: ['Male', 'Female', 'Others']
        };

    }


    handleRowClick(student) {
        console.log(this.props);
        console.log(student.author);
       this.props.history.replace({ pathname: '/editStudent/' + student.author });
     // this.context.router.transitionTo('/editStudent/' + id)
    //  this.context.history.replace({ pathname: '/editStudent/' + student.author});
        this.props.dataToEdit(student);
    }

    componentDidMount() {
        console.log(this.props);
    }

    submitForm() {
        let formvalues = this.state.user;
        console.log(formvalues);
        let queryParams = this.paramsStringify(formvalues);
        console.log(queryParams);
    }
    handleStudentSearchClick() {
        this.props.loadSpinner(true);
        console.log(this.state.firstName);
        axios.get('https://hn.algolia.com/api/v1/search?query=')
            .then(response => {
                // console.log(response.data.hits);
                // this.setState({ studentsList: response.data.hits });
                this.props.updateSearchResults(response.data.hits);
                this.props.loadSpinner(false);
            }).catch(error => {
                console.log(error);
            })
    }


    handleChange = event => {
        this.setState({ firstName: event.target.value });
    };
    paramsStringify(filterObj) {
        let finalParams = '';
        let params = {};
        let tempFilter = this.state.user;
        let keys = Object.keys(tempFilter);
        keys.map(k => {
            return params = {
                ...params,
                [k]: filterObj[k]
            }
        })
        finalParams = "?";
        keys = Object.keys(params);
        keys.map(k => {
            if (params[k] !== "") {
                finalParams = (finalParams === "?" ? finalParams : finalParams + "&") + k + "=" + params[k].toString();
            }
        });
        return finalParams;
    }

    handleInputChange(e) {
        e.preventDefault();
        let value = e.target.value;
        let name = e.target.name;
        console.log(value);
        // this.setState(prevState => ({
        //     user:
        //         { ...prevState.user, [name]: value }
        // }))

        const newUserForm = { ...this.state.user }; //cloning the form into new variable
        //  const updatedField = newUserForm.name;
        this.setState({ user: { ...newUserForm, [name]: value } });
    }

    render() {
        return (
            <div >
                {/* <input
                    type="text"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                /> */}
                <button type="submit" onClick={this.handleStudentSearchClick}>Search Student</button>
                <form>
                    {/* <Input
                        title={'First Name:'}
                        name={'firstname'}
                        type={'text'}
                        value={this.state.user.firstName}
                        placeholder={'Enter First Name'}
                        handleChange={this.handleInputChange}
                        
                    /> */}
                    <Input
                        title={'Last Name:'}
                        name={'lastName'}
                        type={'text'}
                        value={this.state.user.lastName}
                        placeholder={'Enter Last Name'}
                        handleChange={this.handleInputChange}
                    />
                    <Input
                        title={'Email:'}
                        name={'email'}
                        type={'text'}
                        value={this.state.user.email}
                        placeholder={'Enter Email'}
                        handleChange={this.handleInputChange}
                    />

                    <Select
                        title={'State'}
                        name={'state'}
                        options={this.state.states}
                        placeholder={'Select'}
                        value={this.state.user.state}
                        handleChange={this.handleInputChange} />

                    <Button
                        title={'Submit Form'}
                        action={this.submitForm}
                    />
                </form>
                <ResultContainer
                    data={this.props.studentsList}
                    handleUpdateData={this.handleRowClick} />
                <p>Paragraph</p>
                {this.props.ctr}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ctr: state.employee.counter,
        studentsList: state.student.results
    };
};

const dispatchStateToProps = dispatch => {
    return {
        // updateSearchResults: (param) => dispatch({type: SEARCH_RESULTS, value: param})

        updateSearchResults: (param) => dispatch(searchResults(param)),
        loadSpinner: (param) => dispatch({ type: LOADING, value: param }),
        dataToEdit: (param) => dispatch({type: DATA_TO_UPDATE, value: param})
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(FormContainer);
