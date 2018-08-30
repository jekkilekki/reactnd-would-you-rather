import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, func, string } from 'prop-types'
import { formatQuestion, formatDate } from '../utils/helpers'
import { handleAnswerQuestion, handleDeleteQuestion } from '../actions/questions'
import { CSSTransition } from 'react-transition-group'
import './Question.css'

class Question extends Component {
	static propTypes = {
		question: object.isRequired,
		dispatch: func.isRequired,
		history: object,
		authedUser: string.isRequired
	}

	handleDelete = (e, id) => {
		e.preventDefault()
		const { dispatch } = this.props
		dispatch( handleDeleteQuestion( id ))
	}

	handleAnswer = (e, answered) => {
		e.preventDefault()

		if ( answered ) {
			return
		}

		let answer = ''
		if ( e.target.classList.contains( 'optionOne' ) ) {
			answer = 'optionOne'
		} else if ( e.target.classList.contains( 'optionTwo' ) ) {
			answer = 'optionTwo'
		} else {
			alert( 'There was an error making your choice. Please try again.' )
		}

		const { dispatch, authedUser, question } = this.props
		const qid = question.id

		dispatch( handleAnswerQuestion ({
			qid,
			authedUser,
			answer
		}))
	}

	render() {
		const { question, user, authedUser, single } = this.props

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

		let optionOneScore = Math.trunc(optionOne.votes.length / answers * 100),
				optionOneGradient = answered && optionOneScore > 0
					? `linear-gradient(to right, #80cbc4 ${optionOneScore}%, #cfd8dc ${optionOneScore}%)` 
					: 'linear-gradient(to right, #cfd8dc 0%, #cfd8dc 100%)',
				optionTwoScore = Math.trunc(optionTwo.votes.length / answers * 100),
				optionTwoGradient = answered && optionTwoScore > 0
					? `linear-gradient(to right, #ce93d8 ${optionTwoScore}%, #cfd8dc ${optionTwoScore}%)` 
					: 'linear-gradient(to right, #cfd8dc 0%, #cfd8dc 100%)'

		const transitionOptions = {
			classNames: 'dashboard-list',
			// key,
			timeout: { enter: 500, exit: 500 }
		}

		if ( answered ) {
			return (
				<CSSTransition {...transitionOptions}>
					{/* <span>You answered this question.</span> */}
				</CSSTransition>
			)
		}

		return (
			<CSSTransition {...transitionOptions}>
			<div className={'question card ' + (answered ? 'answered z-depth-0 blue-grey lighten-5' : '') + (! single ? ' hoverable' : '')}>
				<header>
					{ answered && 
						<p className='status'>You would rather
							<br /><span className={choiceClass}>{choice}</span>
						</p>
					}
					{ asked &&
						<span className='delete' onClick={(e) => this.handleDelete(e)}>
							<i className='material-icons black-text' title='Delete your question'>close</i>
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
				{ answered &&
					<div className='results'>
						<h3 className='section-title'>Poll Results</h3>
						<p 
							className='optionOne-result'
							style={{backgroundImage: `${optionOneGradient}`}}
						>
							<span className='result-text'>{optionOne.text}</span>
							<span>
								<strong className='result-score'>{optionOneScore}%</strong>
								<span className='result-votes'>{optionOne.votes.length} {optionOne.votes.length === 1 ? 'Vote' : 'Votes'}</span>
							</span>
						</p>
						<p 
							className='optionTwo-result'
							style={{backgroundImage: `${optionTwoGradient}`}}
						>
							<span className='result-text'>{optionTwo.text}</span>
							<span>
								<strong className='result-score'>{optionTwoScore}%</strong>
								<span className='result-votes'>{optionTwo.votes.length} {optionTwo.votes.length === 1 ? 'Vote' : 'Votes'}</span>
							</span>
						</p>
					</div>
				}

				<footer className='question-meta'>
					<span className='answers'>
						{ answers } Answer{ answers === 1 ? '' : 's'}
					</span>
					<span className='timestamp'>{formatDate(timestamp)}</span>
				</footer>
			</div>
			</CSSTransition>
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