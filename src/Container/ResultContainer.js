import React, { Component } from 'react';
class ResultContainer extends Component {


   
  
    renderStudentData() {
        return this.props.data.map((student, index) => {
            const { title, url, author } = student
            return (
                // <Link to={'/editStudent/'+ author}>
                <tr key={author} onClick={() =>this.props.handleUpdateData(student)}>
                    <td>{title}</td>
                    <td>{url}</td>
                    <td>{author}</td>
                </tr>
                // </Link>
            )
        })
    }
    render(){
        if(this.props.data.length === 0){
            return (
                <div>No Results to Display</div>
            );
        }
         return (
           
            <div>
                <h1>Records to Display</h1>
                    <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Author</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {this.renderStudentData()}
                    </tbody>
                </table>
            </div>
            )
    }
       

}
export default ResultContainer;
