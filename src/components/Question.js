import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, func, string } from 'prop-types'
import { formatQuestion, formatDate } from '../utils/helpers'
import { handleAnswerQuestion, handleDeleteQuestion } from '../actions/questions'
import { withRouter } from 'react-router'
import QuestionVisual from './QuestionVisual'
import './Question.css'

class Question extends Component {
	static propTypes = {
		question: object.isRequired,
		dispatch: func.isRequired,
		history: object,
		authedUser: string.isRequired
	}

	handleDelete = (e) => {
		e.preventDefault()
		const { dispatch } = this.props
		const qid = e.target.classList[2].substr(7) // Get the id of the question to delete out of the button classList

		dispatch( handleDeleteQuestion( qid ))
	}

	handleAnswer = (e, answered) => {
		e.preventDefault()
		const { dispatch, authedUser, question, history } = this.props
		const qid = question.id

		if ( answered ) {
			history.push(`/question/${qid}`)
			return // without the return, we could vote infinitely
		}

		let answer = ''
		if ( e.target.classList.contains( 'optionOne' ) ) {
			answer = 'optionOne'
		} else if ( e.target.classList.contains( 'optionTwo' ) ) {
			answer = 'optionTwo'
		} else {
			alert( 'There was an error making your choice. Please try again.' )
		}

		dispatch( handleAnswerQuestion ({
			qid,
			authedUser,
			answer
		}))
	}

	render() {
		const { question, user, authedUser, single, id } = this.props

		if ( null === question ) {
			return (
				<p>This question doesn't exist.</p>
			)
		}

		const { name, avatar, timestamp, optionOne, optionTwo } = question
		let answers = optionOne.votes.length + optionTwo.votes.length,
				answered = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
				asked = authedUser === user.id,
				choice = '',
				choiceClass = ''
			
		if (optionOne.votes.includes(authedUser)) {
			choice = optionOne.text
			choiceClass = 'teal-text'
		} else {
			choice = optionTwo.text
			choiceClass = 'purple-text'
		}

		return (
			<div className={'question card ' + (answered ? 'answered z-depth-0 blue-grey lighten-5' : '') + (! single ? ' hoverable' : '') + ` question-${id}`}>
				<header>
					{ answered && 
						<p className='status'>You would rather
							<br /><span className={choiceClass}>{choice}</span>
						</p>
					}
					{ asked &&
						<span className={`delete`} onClick={(e) => this.handleDelete(e)}>
							<i className={`material-icons black-text delete-${id}`} title='Delete your question'>close</i>
						</span>
					}
					<div 
						style={{backgroundImage: `url(${avatar})`}}
						alt={`Avatar of ${name}`}
						className={'avatar ' + (asked ? 'z-depth-1' : '')}
					>
					</div>
					<div className='question-meta'>
						{ asked && 
							<span className='author'><strong>You</strong> asked</span>
						}
						{ ! asked && 
							<span className='author'><strong>{name}</strong> asks </span>
						}
						<span className='question-text'>"Would you rather...?"</span>
					</div>
				</header>

				<div className={'options ' + (answered ? 'z-depth-0' : '')}>

					{/* Option One */}
					<div
						className={'btn waves-effect waves-light options optionOne ' + 
							( answered && ! optionOne.votes.includes(authedUser) ? 'blue-grey lighten-3' : '' )
						}
						// style={{backgroundImage: `${optionOneGradient}`}}
						onClick={(e) => this.handleAnswer(e, answered)}
					>
						<span className={answered ? 'unclickable' : ''}>
							{ answered && optionOne.votes.includes(authedUser) && 
								<span className='your-answer'>
									<i className='material-icons'>check</i>
								</span>
							}
							<span className='optionOne'>{ optionOne.text }</span>
						</span>
					</div>

					<span className="or">or</span>

					{/* Option Two */}
					<div
						className={'btn waves-effect waves-light options optionTwo ' + 
							( answered && ! optionTwo.votes.includes(authedUser)? 'blue-grey lighten-3' : 'purple lighten-2 ' )
						}
						// style={{backgroundImage: `${optionTwoGradient}`}}
						onClick={(e) => this.handleAnswer(e, answered)}>
						<span className={answered ? 'unclickable' : ''}>
							{ answered && optionTwo.votes.includes(authedUser) && 
								<span className='your-answer'>
									<i className='material-icons'>check</i>
								</span>
							}
							<span className='optionTwo'>{ optionTwo.text }</span>
						</span>
					</div>
				</div>

				{/* Results */}
				{ answered && single &&
					<QuestionVisual optionOne={optionOne} optionTwo={optionTwo} />
				}

				<footer className='question-meta'>
					<span className='answers'>
						{ answers } Answer{ answers === 1 ? '' : 's'}
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

export default withRouter(connect(mapStateToProps)(Question))