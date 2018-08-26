import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, func, string } from 'prop-types'
import { formatQuestion, formatDate } from '../utils/helpers'
import { handleAnswerQuestion } from '../actions/questions'
import './Question.css'

class Question extends Component {
	static propTypes = {
		question: object.isRequired,
		dispatch: func.isRequired,
		history: object,
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
		const { question, user, authedUser } = this.props
		console.log( "User: ", user )

		if ( null === question ) {
			return <p>This question doesn't exist.</p>
		}

		const { name, avatar, timestamp, optionOne, optionTwo, votes, text } = question
		const { answers, questions } = user

		return (
			<div className={'question card hoverable ' + (authedUser === user.id ? 'current-user z-depth-3' : '')}>
				<header>
					<div 
						style={{backgroundImage: `url(${avatar})`}}
						alt={`Avatar of ${name}`}
						className={'avatar ' + (authedUser === user.id ? 'z-depth-1' : '')}
					>
					</div>
					<div className='question-meta'>
						{ authedUser === user.id && 
							<span className='author'><strong>You</strong> asked</span>
						}
						{ authedUser !== user.id && 
							<span className='author'><strong>{name}</strong> asks </span>
						}
						<span className='question-text'>"Would you rather...?"</span>
					</div>
				</header>
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
				<footer className='question-meta'>
					<span className='answers'>
						{ authedUser === user.id && <i className='material-icons'>check</i>}
						{answers !== undefined && answers.length} Answers
					</span>
					<span className='timestamp'>{formatDate(timestamp)}</span>
				</footer>
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

export default connect(mapStateToProps)(Question)