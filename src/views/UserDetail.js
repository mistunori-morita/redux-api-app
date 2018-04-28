import React, { Component } from 'react'


class UserDetail extends Component{
  componentWillMount(){
    console.log(this.props.match.params.userId)
  }
  render(){
    console.log(this.props);
    return(
      <div>
        <h2>Haloa</h2>
      </div>
    );
  }
}


export default UserDetail;