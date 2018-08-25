import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { object, func, string } from 'prop-types'
import { formatQuestion, formatDate } from '../utils/helpers'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
	static propTypes = {
		question: object.isRequired,
		dispatch: func.isRequired,
		history: object.isRequired,
		authedUser: string.isRequired
	}

	toParent = (e, id) => {
		e.preventDefault()
		this.props.history.push(`/question/${id}`)
	}

	handleAnswer = (e, id) => {
		e.preventDefault()

		const { dispatch, authedUser, question } = this.props
		dispatch( handleAnswerQuestion ({
			id,
			authedUser,
			hasAnswered: question.hasAnswered
		}))
	}

	render() {
		const { question } = this.props
		if ( null === question ) {
			return <p>This question doesn't exist.</p>
		}

		const { id, timestamp, optionOne, optionTwo, author, text } = question
		const { name, avatarURL, answers, questions } = author
		
		return (
			<Link to={`/question/${id}`}>
				<div className='question card'>
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
			</Link>
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