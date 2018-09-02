import React, { Component } from 'react'
import { Dropdown, NavItem } from 'react-materialize'

class LoginDropdown extends Component {
  render() {
    return (
      <Dropdown trigger={
        <div className='login-dropdown user-select'>Select User</div>
      }>
        {users.map((user) => (
          <NavItem 
            key={user.id}
            id={user.id} 
            className={`login-dropdown ${user.id}`}
            onClick={(e) => this.handleSelect(e)}
          >
            <div id={user.id}>
              <div 
                style={{backgroundImage: `url(${user.avatarURL})`}} 
                title={user.name} 
                className='avatar'>
              </div>
              <span className='user'>{user.name}</span>
            </div>
          </NavItem>
        ))}
      </Dropdown>
    )
  }
}

export default LoginDropdown