import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
	handleAnswer = (e) => {
		e.preventDefault()

		const { dispatch, question, authedUser } = this.props
		dispatch( handleAnswerQuestion ({
			id: question.id,
			hasAnswered: question.hasAnswered,
			authedUser
		}))
	}

	render() {
		const { question } = this.props
		if ( null === question ) {
			return <p>This question doesn't exist.</p>
		}

		const {
			id, author, avatarURL, timestamp, optionOne, optionTwo, text, hasAnswered, answers
		} = question
		
		return (
			<div className='question'>
				<img 
					src={avatarURL}
					alt={`Avatar of ${author}`}
					className='avatar'
				/>
				<div className='question-meta'>
					<span className='timestamp'>{/*formatDate(timestamp)*/}</span>
					<span className='author'>{author}</span> asks
				</div>
				<div className='options'>
					<button
						className='optionOne'
						onClick={(e) => this.optionOne(e)}>
						{optionOne[text]}
					</button>
					<button
						className='optionTwo'
						onClick={(e) => this.optionTwo(e)}>
						{optionTwo[text]}
					</button>
				</div>
				<div className='question-icons'>
					{/* <TiArrowBackOutline className='return-to-dashboard' /> */}
					<span>{answers !== 0 && answers}</span>
				</div>
			</div>
		)
	}
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
	const question = questions[id]
	return {
		authedUser,
		question: questions[id]
	}
}

export default connect(mapStateToProps)(Question)