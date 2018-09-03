import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { func, bool } from 'prop-types'

import ProtectedRoute from './ProtectedRoute'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import Login from './Login'
import Nav from './Nav'
import Dashboard from './Dashboard'
import QuestionSingle from './QuestionSingle'
import AddQuestion from './AddQuestion'
import LeaderBoard from './LeaderBoard'
import NotFound from './NotFound'
import './App.css'

class App extends Component {
  static propTypes = {
    loading: bool.isRequired,
    dispatch: func.isRequired
  }

  state = {
    firstLogin: true
  }

  componentDidMount() {
    this.props.dispatch( handleInitialData() )
  }

  render() {
    const { loading } = this.props

    return (
      <Router>
        <Fragment>
          <LoadingBar style={{backgroundColor: '#9c27b0', height: '5px'}} />
          { loading
            ? (
              <main className='app app-container'>
                <Nav />
                <Switch>
                  <Route path='/login' component={Login} />
                  <Route exact path ="/" component = {Home}/>
                  <Redirect to={{
                    pathname: '/login',
                    state: { from: this.props.location }
                  }} />
                </Switch>
              </main>
            )
            : (
              <main className="app app-container">
                <Nav />
                <Switch>
                  <Route exact path="/" component={Home} />
                  <ProtectedRoute path='/dashboard/:type' component={Dashboard} firstLogin={this.state.firstLogin} />
                  <ProtectedRoute from='/dashboard' to='/dashboard/unanswered' />
                  <ProtectedRoute path="/add" component={AddQuestion} />
                  <Route path="/question/:id" component={QuestionSingle} />
                  <ProtectedRoute path="/leaderboard" component={LeaderBoard} />
                  <Route path="/login" component={Login} firstLogin={this.state.firstLogin} />
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
    loading: authedUser === null,
    authedUser
  }
}

export default connect(mapStateToProps)(App)
