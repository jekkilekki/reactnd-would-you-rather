import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Question from './Question'

class Home extends Component {
  render() {
    return (
      <section className='page-content'>
        <h1 className='page-title center'>Welcome to <span>Would You Rather?</span></h1>
        <div className='card'>
        
        </div>
      </section>
    )
  }
}

export default connect()(Home)