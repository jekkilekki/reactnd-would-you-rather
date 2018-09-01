import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'

class DashboardNav extends Component {
  render() {
    const { history } = this.props 

    return (
      <ul className='tabs card'>
        <Link to='/dashboard/all' 
          className={'tab' + (history.location.pathname === '/dashboard/all' ? ' active' : '')}>
          All
        </Link>
        <Link to='/dashboard/unanswered'
          className={'tab' + (history.location.pathname === '/dashboard/unanswered' ? ' active' : '')}>
          Unanswered 
        </Link>
        <Link to='/dashboard/answered' 
          className={'tab' + (history.location.pathname === '/dashboard/answered' ? ' active' : '')}>
          Answered
        </Link>
        <Link to='/dashboard/my-questions' 
          className={'tab' + (history.location.pathname === '/dashboard/my-questions' ? ' active' : '')}>
          Mine
        </Link>
      </ul>
    )
  }
}

export default withRouter(connect()(DashboardNav))