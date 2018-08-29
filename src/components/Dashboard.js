import React, { Component } from 'react'
import Toast from 'react-materialize'
import { connect } from 'react-redux'
import { array } from 'prop-types'
import { Link } from 'react-router-dom'
import Question from './Question'

class Dashboard extends Component {
	static propTypes = {
		questionIds: array.isRequired
	}

	componentDidMount() {
		const { authedUser, users, firstLogin } = this.props 

		if ( firstLogin ) {
			window.Materialize.toast( `Welcome back, ${users[authedUser].name}!` , 5000 )
			// this.setState((prevState) => ({
			// 	firstLogin: prevState.firstLogin + 1
			// }))
		}
	}

	render() {
		const { history } = this.props 

		return (
			<section className='page-content'>
				<h2 className='center'>All Questions</h2>
				<ul className='tabs card'>
					<Link to='/dashboard/all' 
						className={'tab' + (history.location.pathname === '/dashboard/all' ? ' active' : '')}>
						All
					</Link>
					<Link to='/dashboard/unanswered'
						className={'tab' + (history.location.pathname === '/dashboard/unanswered' ? ' active' : '')}>
						Unanswered 
					</Link>
					<Link to='/dashboard/answered' 
						className={'tab' + (history.location.pathname === '/dashboard/answered' ? ' active' : '')}>
						Answered
					</Link>
					<Link to='/dashboard/my-questions' 
						className={'tab' + (history.location.pathname === '/dashboard/my-questions' ? ' active' : '')}>
						Mine
					</Link>
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

function mapStateToProps({ questions, authedUser, users }, { history }) {
	let sortedQuestions = {}
	switch(history.location.pathname) {
		case '/dashboard/answered':
			sortedQuestions = Object.keys(questions)
				.filter((id) => questions[id].optionOne.votes.includes(authedUser) || questions[id].optionTwo.votes.includes(authedUser))
			break;
		case '/dashboard/unanswered':
			sortedQuestions = Object.keys(questions)
				.filter((id) => ! questions[id].optionOne.votes.includes(authedUser) && ! questions[id].optionTwo.votes.includes(authedUser))
			break;
		case '/dashboard/my-questions':
			sortedQuestions = Object.keys(questions)
				.filter((id) => questions[id].author === authedUser)
			break;
		default:
			sortedQuestions = Object.keys(questions)
	}
	return {
		authedUser,
		users,
		questionIds: sortedQuestions
			.sort((a,b) => questions[b].timestamp - questions[a].timestamp),
	}
}

export default connect(mapStateToProps)(Dashboard)