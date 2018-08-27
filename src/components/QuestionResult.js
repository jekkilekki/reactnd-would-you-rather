import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, func, string } from 'prop-types'
import { formatQuestion, formatDate } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import './Question.css'

class QuestionResult extends Component {
	render() {
		const { question, user, authedUser } = this.props

		if ( null === question ) {
			return <p>This question doesn't exist.</p>
		}

		const { name, avatar, timestamp, optionOne, optionTwo, votes, text } = question
		const { answers, questions } = user

		return (
			<div className='question card z-depth-0'>
        Vote Distribution
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
	const question = questions[id]
	return {
		authedUser,
		user: users[question.author],
		question: question
			? formatQuestion( question, users[question.author], authedUser )
			: null
	}
}

export default connect(mapStateToProps)(QuestionResult)