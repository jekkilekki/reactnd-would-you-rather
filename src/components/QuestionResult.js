import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import User from './User'
import './Question.css'

class QuestionResult extends Component {
	render() {
		const { question } = this.props

		if ( null === question ) {
			return <p>This question doesn't exist.</p>
		}

		return (
			<div className='question-results card z-depth-0'>
        <h3 className='section-title'>Vote Distribution</h3>
        <div className='options-container'>
          <div className='optionOne-list-container'>
            <p className='optionOne-text teal-text'>{question.optionOne.text}</p>
            <ul className='optionOne-list'>
              {question.optionOne.votes.map((id) => (
                <li key={id}>
                  <User id={id} options='picture-only' />
                </li>
              ))}
            </ul>
          </div>
          <div className='optionTwo-list-container'>
            <p className='optionOne-text purple-text'>{question.optionTwo.text}</p>
            <ul className='optionTwo-list'>
            { question.optionTwo.votes.map((id) => (
                <li key={id}>
                  <User id={id} options='picture-only' />
                </li>
              ))}
            </ul>
          </div>
        </div>
			</div>
    )
	}
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
	const question = questions[id]
	return {
		question: question
			? formatQuestion( question, users[question.author], authedUser )
			: null
	}
}

export default connect(mapStateToProps)(QuestionResult)