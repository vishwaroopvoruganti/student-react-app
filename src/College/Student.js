import React, { useState } from 'react';


const Student = props => {
    const [studentState, setStudentState] = useState({
        student: [
            { name: 'Bhargav', age: '27' },
            { name: 'Prashanth', age: '25' },
        ],
    });
    return (
        <div>
            <h1>I am working</h1>
            {/* <Parent /> */}
        </div>
    );
}

export default Student;