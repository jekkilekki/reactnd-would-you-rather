import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Question from './Question'
import AppFooter from './AppFooter'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <section className='page-content'>
          <h1 className='page-title center'>Welcome to <span className='purple-text subtitle center'>Would You Rather?</span></h1>
          <div className='card'>
          
          </div>
        </section>
        <AppFooter/>
      </Fragment>
    )
  }
}

export default connect()(Home)