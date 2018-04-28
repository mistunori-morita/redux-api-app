import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

import UserPost from './UserPost'

class UserDetailBody extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages: this.props.messages
    }
  }
  render(){
    console.log(this.state.messages)
    let messages = this.state.messages.map((currentValue) => {
      return( <UserPost />);
    })
    return(
      <div className="UserDetailBody">

      </div>
    );
  }
}


UserDetailBody.propTypes = {
  messages: PropTypes.array.isRequired
}

export default UserDetailBody;