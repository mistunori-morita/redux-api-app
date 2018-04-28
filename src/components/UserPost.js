import React, { Component } from 'react'
import './index.css'
import PropTypes from 'prop-types'


class UserPost extends Component {
  render() {
    const {title, message} = this.props;
    return (
      <div className="UserPost">
        <h1 className="">{ title }</h1>
        <h2 className="">{message}</h2>
      </div>
    );
  }
}

UserPost.proptypes = {
  id: PropTypes.any,
  title: PropTypes.string,
  message: PropTypes.string
}

export default UserPost;