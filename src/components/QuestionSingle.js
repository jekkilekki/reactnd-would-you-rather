import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import AddQuestion from './AddQuestion'

class QuestionSingle extends Component {
	render() {
		const { id } = this.props.match.params
		return (
			<section className='page-content'>
				<Question id={id} />
				<AddQuestion id={id} />
				{/* <ul className='question-list'>
					{answers.map((answerId) => (
						<li key={answerId}>
							<Question id={answerId} />
						</li>
					))}
				</ul> */}
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