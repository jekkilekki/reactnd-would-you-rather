import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends Component {
	render() {
		const { users } = this.props

		return (
			<section className='page-content'>
				<h2 className='center'>Leaderboard</h2>
				<ul className='leaderboard-list'>
					{this.props.userIds.map((id, i) => (
						<li key={id} className={`user-${id}`}>
							<User id={id} rank={i+1} />
						</li>
					))}
				</ul>
			</section>
		)
	}
}

function mapStateToProps({ users }) {
	return {
		userIds: Object.keys(users)
			.sort((a, b) => {
				return (users[b].questions.length + Object.keys(users[b].answers).length) -
							 (users[a].questions.length + Object.keys(users[a].answers).length)
			})
	}
}

export default connect(mapStateToProps)(LeaderBoard)