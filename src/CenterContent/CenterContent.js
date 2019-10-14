import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import { Route } from 'react-router-dom';
import ReactiveForm from '../ReactiveForms/ReactiveForm';
import Post from '../MyFolder/Post';
import CustomeTabs from '../Tabs/CustomeTabs';
export class ResultContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accordians: [
                { name: 'Acc1', id: 'a1' },
                { name: 'Acc2', id: 'a2' },
                { name: 'Acc3', id: 'a3' },
            ],
            accordianId: 'a1',
        };
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillUnmount() {
        console.log('destroyed');
    }
    clickAcc = (id) => {
        console.log(id + 'Acc clicked');
        console.log(this.props);
        this.setState({ accordianId: id });
    }

    renderAccordian = () => {
        return this.state.accordians.map((acc, index) => {
            const { name, id } = acc
            return (
                //Based on routing we will display accordians
                <Route key={id} render={({ history }) => (
                    <Card key={id} style={{ 
                        marginBottom: 10, 
                     }}
                          onClick={() => { history.push('/center-content/' + id) }}>
                        <Accordion.Toggle as={Card.Header} eventKey={id}>
                            {name}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={id}>
                            <Card.Body >
                                <Route exact path='/center-content/a1' component={ReactiveForm}></Route>
                                <Route exact path='/center-content/a2' component={Post}></Route>
                                <Route exact path='/center-content/a3' component={CustomeTabs}></Route>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                )} />
            )
        })
    }
    render() {
        return (
            <div>
                <h1>{this.state.accordianId}</h1>
                <Accordion defaultActiveKey={this.state.accordianId}>
                    {this.renderAccordian()}
                </Accordion>
            </div>
        );
    }
}

export default ResultContainer;