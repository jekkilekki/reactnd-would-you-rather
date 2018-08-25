import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { object, func, string } from 'prop-types'
import { formatQuestion, formatDate } from '../utils/helpers'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import { handleAnswerQuestion } from '../actions/questions'
import './Question.css'

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
		console.log( "Question: ", question )
		if ( null === question ) {
			return <p>This question doesn't exist.</p>
		}

		// const { name, avatarURL, answers, questions } = user
		const { id, name, avatar, answers, timestamp, optionOne, optionTwo, votes, text } = question
		
		return (
			<div className='question card hoverable'>
				<div 
					style={{backgroundImage: `url(${avatar})`}}
					alt={`Avatar of ${name}`}
					className='avatar'
				></div>
				<div className='question-meta'>
					<span className='timestamp'>{/*formatDate(timestamp)*/}</span>
					<span className='author'>{name}</span> asks <span className='question-text'>"Would you rather...?"</span>
				</div>
				<div className='options'>
					<div
						className='btn waves-effect waves-light options optionOne'
						onClick={(e) => this.optionOne(e)}>
						{optionOne.text}
					</div>
					<span className="or">or</span>
					<div
						className='btn purple lighten-2 waves-effect waves-light options optionTwo'
						onClick={(e) => this.optionTwo(e)}>
						{optionTwo.text}
					</div>
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
		question: question
			? formatQuestion( question, users[question.author], authedUser )
			: null
	}
}

export default connect(mapStateToProps)(Question)