import React from 'react';
import loader from '../assets/loader.gif'

const Spinner = (props) => {
  
	return(<div>
        
        
        {props.loading ?
              <div className="comp-overlay">
                <img style={{ marginTop: 300, marginBottom: 10, marginLeft: 40, marginRight: 40, height: 100 }}
                  src={loader} />
              </div> : null}
		    
  </div>)
}

export default Spinner;


