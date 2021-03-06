import React, { Component } from 'react'
// import Toast from 'react-materialize'
import { connect } from 'react-redux'
import { array } from 'prop-types'
import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import Question from './Question'
import DashboardNav from './DashboardNav'

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

		let pageSubtitle = 'All Questions'
		switch( history.location.pathname ) {
			case '/dashboard/unanswered':
				pageSubtitle = 'Unanswered Questions'
				break;
			case '/dashboard/answered':
				pageSubtitle = 'Answered Questions'
				break;
			case '/dashboard/my-questions':
				pageSubtitle = 'My Questions'
				break;
			default:
				pageSubtitle = 'All Questions'
		}

		const transitionOptions = {
			classNames: 'dashboard-list',
			// key,
			timeout: { enter: 500, exit: 500 }
		}

		return (
			<section className='page-content dashboard'>
				<h2 className='page-title center'>Dashboard</h2>
				<p className='page-subtitle center'>{pageSubtitle}</p>
				
				<DashboardNav />

				<TransitionGroup component='ul' className='dashboard-list order'>
					{this.props.questionIds.map((id) => (
						<CSSTransition key={id} {...transitionOptions}>
							<li className={`question-${id}`}>
								<Link to={`/questions/${id}`}>
									<Question id={id} />
								</Link>
							</li>
						</CSSTransition>
					))}
				</TransitionGroup>
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