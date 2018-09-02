import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './Question'
import QuestionResult from './QuestionResult'

class QuestionSingle extends Component {
	render() {
		const { id } = this.props.match.params
		const { questions, authedUser } = this.props

		// console.log( "Props! ", this.props )
		// console.log( "Question! ", questions[id])

		let answered = questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser)

		// if id !=== found in questions, Redirect to /404

		return (
			<section className='page-content'>
				<Link className='back-button' to='/dashboard/unanswered'>
					<i className='material-icons'>arrow_back</i> Back to Dashboard
				</Link>
				<Question id={id} single={true} />
				{ answered && 
					<QuestionResult id={id} />
				}
				{ ! answered && 
					<p className='alert info'>Make a selection to view the results.</p>
				}
			</section>
		)
	}
}

function mapStateToProps({ authedUser, questions }) {
	return {
		authedUser,
		questions,
	}
}

export default connect(mapStateToProps)(QuestionSingle)