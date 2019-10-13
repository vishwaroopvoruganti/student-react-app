import React, { Component } from 'react';

class Post extends Component {
constructor(props){
    super(props);


}
componentWillUnmount() {
    console.log('Post destroyed');
}
render(){
    return(
        <div>Acc2 JKBKJDBK</div>
    )
}
}

export default Post;