import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AppFooter from './AppFooter'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <section className='page-content home-page'>
          <h1 className='page-title center'>Welcome to <span className='purple-text subtitle center'>Would You Rather?</span></h1>
          <div className='card'>
            <p><strong>Would You Rather?</strong> is a React + Redux Polling App that utilizes the 
              <a href="https://redux.js.org/basics/store">Redux store</a> to maintain application state.
            </p>
            <p>This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>.<br />
              It was built as part of Udacity's <a href="https://www.udacity.com/course/react-nanodegree--nd019">React Nanodegree</a> program.
            </p>
            <h2>Overview</h2>
            <p>In a nutshell, users are able to:
              <ul>
                <li>Login to the app as one of three default members</li>
                <li>Pre-defined questions are loaded from the "fake" Database (<code>_DATA.js</code>)</li>
                <li>Users may then navigate the Dashboard to view Answered, Unanswered, or user-created questions (Mine)</li>
                <li>They may answer questions or ask additional questions</li>
                <li>The Leaderboard updates users' rank and score based on their activity in the app</li>
              </ul>
            </p>
            <p>More information about the architecture and functionality of this app can be found at the 
              project's GitHub repository <a href="https://github.com/jekkilekki/reactnd-would-you-rather/blob/master/README.md">README</a>.
            </p>
          </div>
        </section>
        <AppFooter/>
      </Fragment>
    )
  }
}

export default connect()(Home)