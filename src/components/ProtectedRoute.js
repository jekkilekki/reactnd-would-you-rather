import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function ProtectedRoute({ component: Component, ...rest }) {
  const { authedUser } = rest
  return (
    <Route render={ props => 
      authedUser !== null
      ? <Component {...props} /> 
      : <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }}
        />
      }
    />
  )
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(ProtectedRoute)