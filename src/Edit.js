import React, { Component } from 'react';
import { connect } from 'react-redux';

class Edit extends Component {
    constructor(props) {
        console.log('Constructor called')
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        console.log(this.props);
        console.log('Did Mount called');
        console.log(this.props.match.params.id);
    }

    // componentWillMount() {
    //     console.log('Will Mount called');
    // }

    render() {
        console.log('Render called');

        return (
            <div>Edit Page working</div>
        )
    }

}
const mapStateToProps = state => {
    return {
        
        studentData: state.student.updateValues,
    };
};

const dispatchStateToProps = dispatch => {
    return {
        // updateSearchResults: (param) => dispatch({type: SEARCH_RESULTS, value: param})

        // updateSearchResults: (param) => dispatch(searchResults(param)),
        // loadSpinner: (param) => dispatch({ type: LOADING, value: param }),
        // dataToEdit: (param) => dispatch({type: DATA_TO_UPDATE, value: param})
    };
};

export default connect(mapStateToProps, dispatchStateToProps)(Edit);

