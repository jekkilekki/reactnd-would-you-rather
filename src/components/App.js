import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import './App.css'

import Login from './Login'
import Dashboard from './Dashboard'
import QuestionSingle from './QuestionSingle'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch( handleInitialData() )
  }

  render() {
    const { loading } = this.props
    return (
      <div>
        <LoadingBar />
        {loading
          ? null
          : <Dashboard />
        }
      </div>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
