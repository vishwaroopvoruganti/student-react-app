import React from 'react';
import {
	ReactiveBase,
	DateRange,
	ResultCard,
	SelectedFilters,
    ReactiveList,
    DatePicker
} from '@appbaseio/reactivesearch';
const DatePickerC = (props) => {
    console.log(props);
    return (  
        
  <div className="form-group">
    {/* <label htmlFor={props.name}>{props.meta.label}</label> */}
   
    <DatePicker
  componentId="someId"
  dataField="mtime"
  title="someDate"
  focused={true}
  numberOfMonths={1}
  queryFormat="date"
  placeholder="mm-dd-yyyy"
  showClear={true}
  clickUnselectsDay={true}
  showFilter={true}
  filterLabel={props.filterLabel}
  URLParams={false}
/>  

  </div>
)
}

export default DatePickerC;