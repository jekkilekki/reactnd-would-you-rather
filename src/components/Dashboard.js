import React, { Component } from 'react'
import { connect } from 'react-redux'
import { array } from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import Question from './Question'

class Dashboard extends Component {
	static propTypes = {
		questionIds: array.isRequired
	}

	render() {
		const { questionIds, answers } = this.props 

		return (
			<section className='page-content'>
				<h2 className='center'>All Questions</h2>
				<ul className='tabs card'>
					<li className='tab active'>All</li>
					<li className='tab'>Answered</li>
					<li className='tab'>Unanswered</li>
				</ul>
				<ul className='dashboard-list'>
					{this.props.questionIds.map((id) => (
						<li key={id} className={`question-${id}`}>
							<Link to={`/question/${id}`}>
								<Question id={id} />
							</Link>
						</li>
					))}
				</ul>
			</section>
		)
	}
}

function mapStateToProps({ questions, authedUser }, { type }) {
	let sortedQuestions = {}
	switch(type) {
		case 'answered':
			sortedQuestions = Object.keys(questions)
				.filter((id) => questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.includes(authedUser))
			break;
		case 'unanswered':
			sortedQuestions = Object.keys(questions)
				.filter((id) => ! questions[id].optionOne.votes.includes(authedUser) && ! questions[id].optionTwo.includes(authedUser))
			break;
		case 'mine':
			sortedQuestions = Object.keys(questions)
				.filter((id) => questions[id].author === authedUser)
			break;
		default:
			sortedQuestions = Object.keys(questions)
	}
	return {
		questionIds: sortedQuestions
			.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
	}
}

export default connect(mapStateToProps)(Dashboard)