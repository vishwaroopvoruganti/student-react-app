import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
//import { Route } from 'react-router-dom';
import EmployeeTab from './MyTabs/EmployeeTab';
import StudentTab from './MyTabs/StudentTab';
import ParentTab from './MyTabs/ParentTab';
class CustomeTabs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabs: [
                { name: 'tab1', id: 't1' },
                { name: 'tab2', id: 't2' },
                { name: 'tab3', id: 't3' }
            ],
            tabId: 'a1',
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    componentWillUnmount() {
        console.log('destroyed');
    }

    //With this approach i tried to render tabs in a dynamic way but I got nested routing 
    //issues while dealing with this approach, however my intention to render and remove from dom is 
    //already provided by ngb-tabs using (mountOnEnter and unmountOnExit)

    // renderTabs = () => {
    //     return this.state.tabs.map((tab, index) => {
    //         const { name, id } = tab
    //         return (

    //             <Tab eventKey={id} title={name} key={id}>
    //             <div>
    //                 <Route exact path='/center-content/a3/t1' component={ParentTab}></Route>
    //                 <Route exact path='/center-content/a3/t2' component={StudentTab}></Route>
    //                 <Route exact path='/center-content/a3/t3' component={EmployeeTab}></Route>
    //                 </div>
    //             </Tab>

    //         )
    //     })
    // }
    tabClick(tab) {
        console.log('/center-content/a3/' + tab);
        this.props.history.push('/center-content/a3/' + tab)
    }
    render() {
        const style = {
            marginBottom: '500px'
        }
        return (
            <div>
                <Tabs defaultActiveKey={this.state.tabs[0].id}
                    mountOnEnter={true} // renders the component on dom only when it is true
                    unmountOnExit={true} //unmounte from dom when it is true
                    transition={false}
                    id="noanim-tab-example"
                    onSelect={(index) => this.tabClick(index)}>
                    {/*  Call this function in 2nd approach
                    {this.renderTabs()} */}
                    <Tab eventKey="home" title="Parent">
                        <ParentTab />
                    </Tab>
                    <Tab eventKey="profile" title="Student">
                        <StudentTab />
                    </Tab>
                    <Tab eventKey="contact" title="Employee" style={style}>
                        <EmployeeTab />
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

export default CustomeTabs;