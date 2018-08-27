import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import QuestionResult from './QuestionResult'

class QuestionSingle extends Component {
	render() {
		const { id } = this.props.match.params
		return (
			<section className='page-content'>
				<Question id={id} />
				<QuestionResult id={id} />
			</section>
		)
	}
}

function mapStateToProps({ authedUser, questions, users }, {questionId} ) {
	const { question } = questions[questionId]
	const { user } = users[question.author]

	return {
		question,
		user,
		questionId
	}
}

export default connect()(QuestionSingle)