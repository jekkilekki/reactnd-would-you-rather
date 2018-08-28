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
		console.log( "Question: ", question )

		if ( null === question ) {
			return <p>This question doesn't exist.</p>
		}

		const { name, avatar, timestamp, optionOne, optionTwo } = question
		let answers = optionOne.votes.length + optionTwo.votes.length,
				answered = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
				asked = authedUser === user.id

		let optionOneScore = optionOne.votes.length / answers * 100,
				optionOneRemainder = 100 - optionOneScore,
				optionOneGradient = answered && optionOneScore > 0
					? `linear-gradient(to right, #80cbc4 ${optionOneScore}%, #cfd8dc ${optionOneRemainder}%)` 
					: 'linear-gradient(to right, #cfd8dc 0%, #cfd8dc 100%)',
				optionTwoScore = optionTwo.votes.length / answers * 100,
				optionTwoRemainder = 100 - optionTwoScore,
				optionTwoGradient = answered && optionTwoScore > 0
					? `linear-gradient(to right, #ce93d8 ${optionTwoScore}%, #cfd8dc ${optionTwoRemainder}%)` 
					: 'linear-gradient(to right, #cfd8dc 0%, #cfd8dc 100%)'

		return (
			<div className={'question card hoverable ' + (answered ? 'answered z-depth-0 blue-grey lighten-5' : '')}>
				<header>
					{ answered && 
						<span className='status'>You answered</span>
					}
					{ asked &&
						<span className='delete'>
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
						onClick={(e) => this.optionOne(e)}>
						<span className={answered ? 'unclickable' : ''}>
							{ answered && optionOne.votes.includes(authedUser) && 
								<span className='your-answer'>
									<i className='material-icons'>check</i>
								</span>
							}
							{ optionOne.text }
						</span>
					</div>

					<span className="or">or</span>

					{/* Option Two */}
					<div
						className={'btn waves-effect waves-light options optionTwo ' + 
							( answered && ! optionTwo.votes.includes(authedUser)? 'blue-grey lighten-3' : 'purple lighten-2 ' )
						}
						// style={{backgroundImage: `${optionTwoGradient}`}}
						onClick={(e) => this.optionTwo(e)}>
						<span className={answered ? 'unclickable' : ''}>
							{ answered && optionTwo.votes.includes(authedUser) && 
								<span className='your-answer'>
									<i className='material-icons'>check</i>
								</span>
							}
							{ optionTwo.text }
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
							<strong className='result-score'>{optionOneScore}%</strong>
							<span className='result-votes'>{optionOne.votes.length} {optionOne.votes.length === 1 ? 'Vote' : 'Votes'}</span>
						</p>
						<p 
							className='optionTwo-result'
							style={{backgroundImage: `${optionTwoGradient}`}}
						>
							<span className='result-text'>{optionTwo.text}</span>
							<strong className='result-score'>{optionTwoScore}%</strong>
							<span className='result-votes'>{optionTwo.votes.length} {optionTwo.votes.length === 1 ? 'Vote' : 'Votes'}</span>
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