import React, { Component } from 'react'
import PropTypes from 'prop-types'

class UserItem extends Component {
  render(){
    const { name, last_name, id, facebook } = this.props;
    return(
      <div className="card">
        <div className="card-content">
          <div className="UserItem-leftbox">
            <img 
            className="UserItem-image"
            src="https://t3.ftcdn.net/jpg/01/04/10/10/240_F_104101070_wbEDt3CmlzqnPbdmOlVCL7Q7yu9mCduz.jpg" alt="" />
          </div>
          <div className="UserItem-rightBox">
            <h2 className="UserItem-name">{name + " " + last_name}</h2> 
            <h2 className="UserItem-facebook">{facebook}</h2> 
          </div>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  facebook: PropTypes.string
}

export default UserItem;