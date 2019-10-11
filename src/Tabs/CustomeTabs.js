import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabContent from 'react-bootstrap/TabContent';
import TabPane from 'react-bootstrap/TabPane';
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom';
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

    // handleSelect = (key) => {
    //     //this.props.history.push('/center-content/a3/+'+id)
    //     console.log(key);
    // }

    renderTabs = () => {
        return this.state.tabs.map((tab, index) => {
            const { name, id } = tab
            return (
              //  <Route render={({ history}) => (
                <Tab eventKey={id} title={name} key={id}
                onSelect={this.handleSelect}>
                <div>
                    <Route exact path='/center-content/a3/t1' component={ParentTab}></Route>
                    <Route exact path='/center-content/a3/t2' component={StudentTab}></Route>
                    <Route exact path='/center-content/a3/t3' component={EmployeeTab}></Route>
                    </div>
                </Tab>
              //  )} />
            )
        })
    }
   tabClick(tab) {
        console.log('/center-content/a3/'+tab);
        this.props.history.push('/center-content/a3/'+tab)
      }
    render() {
        return (
            <div>
            <Tabs defaultActiveKey={this.state.tabs[0].id} transition={false} id="noanim-tab-example"
          //  onSelect={this.handleSelect()}
          onSelect={(index) => this.tabClick(index)}
         // changeTab={this.handleClick} 
          >
                {this.renderTabs()}
            </Tabs>
            </div>
        );
    }
}

export default CustomeTabs;