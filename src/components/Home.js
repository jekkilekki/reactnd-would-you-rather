import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import AppFooter from './AppFooter'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <section className='page-content'>
          <h1 className='page-title center'>Welcome to <span className='purple-text subtitle center'>Would You Rather?</span></h1>
          <div className='card'>
            <p>"Would You Rather" is a web app that lets a user play the “Would You Rather?” game. 
              The game goes like this: A user is asked a question in the form: “Would you rather 
              [option One] or [option Two] ?”. Answering "neither" or "both" is against the rules.
            </p>
            <p>This project was bootstrapped with Create React App.</p>
            <h2>Fake Database</h2>
            <p>The project uses a fake database that uses data in memory. The initial set of data 
              can be found in the _DATA.js file, which represents a fake database and contains methods 
              that allow us to access the data. Since all data is in memory, once the browser is 
              refreshed or the server restarted, all the existing data is reverted back to its initial 
              state.
            </p>
            <h2>App Functionality</h2>
            <p>A user can either log in as an existing user or create a new account if it's a new user. 
              Once authenticated, users will be able to answer questions, see which questions they 
              haven’t answered, see how other people have voted, post questions, and see the ranking of 
              users on the leaderboard.
            </p>
            <h3>Authentication</h3>
            <h3>Unanswered Questions</h3>
            <h3>Question Details</h3>
            <h3>Adding a New Question</h3>
            <h3>leaderboard</h3>
            <h3>404 Page</h3>
            <h2>Getting Started</h2>
            <p>In the project directory, you can run:</p>
            <h4><code>npm install</code></h4>
            <p>Install the dependencies in the local node_modules folder.</p>
            <h4><code>npm start</code></h4>
            <p>Runs the app in the development mode.
              Open http://localhost:3000 to view it in the browser.
            </p>
            <p>The page will reload if you make edits.
              You will also see any lint errors in the console.
            </p>
            <h4><code>npm test</code></h4>
            <p>Launches the test runner in the interactive watch mode.</p>
            <h4><code>npm run build</code></h4>
            <p>Builds the app for production to the build folder.
              It correctly bundles React in production mode and optimizes the build for the best performance.
            </p>
            <p>The build is minified and the filenames include the hashes.
              Your app is ready to be deployed!
            </p>
            <p>This project was bootstrapped with Create React App.</p>
          </div>
        </section>
        <AppFooter/>
      </Fragment>
    )
  }
}

export default connect()(Home)