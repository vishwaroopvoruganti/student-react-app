import React, { Component } from 'react';
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
const connector = new AppSearchAPIConnector({
    searchKey: "search-371auk61r2bwqtdzocdgutmg",
    engineName: "search-ui-examples",
    hostIdentifier: "host-2376rb"
  });
class ParentTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        //   console.log(this.props);
           console.log('Parent Created');
       }

    componentWillUnmount() {
        console.log('Parent destroyed');
    }

    render(){
        return(

            <div><SearchProvider
            config={{
              apiConnector: connector
            }}
          >
            <div className="App">
              <Layout
                header={<SearchBox />}
                bodyContent={<Results titleField="title" urlField="nps_link" />}
              />
            </div>
          </SearchProvider></div>
        )
    }

}

export default ParentTab;