import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { func, bool } from 'prop-types'

import './App.css'
import LoadingBar from 'react-redux-loading'
import Login from './Login'
import Nav from './Nav'
import Dashboard from './Dashboard'
import QuestionSingle from './QuestionSingle'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'

class App extends Component {
  static propTypes = {
    loading: bool.isRequired,
    dispatch: func.isRequired
  }

  componentDidMount() {
    this.props.dispatch( handleInitialData() )
  }

  render() {
    const { loading } = this.props
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          {loading
            ? null
            : (
              <main className="app app-container">
                <Nav />
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="/new" component={AddQuestion} />
                  <Route path="/question/:id" component={QuestionSingle} />
                  <Route path="/leaderboard" component={LeaderBoard} />
                  <Route path="/login" component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </main>
            )
          }
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
