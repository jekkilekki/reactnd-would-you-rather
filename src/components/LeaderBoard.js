import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends Component {
	render() {
		const { userIds, questions, userList } = this.props

		return (
			<section className='page-content'>
				<h2 className='center'>Leaderboard</h2>
				<table className='leaderboard-table card'>
					<thead>
						<tr className='blue-grey lighten-5'>
							<th className='leaderboard-rank' title='Rank'>Rank</th>
							<th className='leaderboard-user'>Member name</th>
							<th className='leaderboard-answered' title='Questions answered'><i className='material-icons'>check</i></th>
							<th className='leaderboard-asked' title='Questions asked'><i className='material-icons'>help_outline</i></th>
							<th className='leaderboard-score' title='Total score'><i className='material-icons'>star</i></th>
						</tr>
					</thead>
					<tbody>
					{userIds.map((id, i) => (
						<User 
							id={id} 
							key={id} 
							className={`user-${id}`} 
							rank={i+1} 
						/>
					))}
					</tbody>
				</table>
			</section>
		)
	}
}

function mapStateToProps({ users, questions }) {
	const userList = Object.keys(users).map((id) => {
		const user = users[id]
		const askCount = user.questions.length
		const ansCount = Object.keys(user.answers).length
		return { ...user, askCount, ansCount, score: (askCount + ansCount)}
	})
	return {
		userIds: Object.keys(users),
		userList: userList
			.sort((a, b) => {
				return a.score - b.score
			}),
			questions
	}
}

export default connect(mapStateToProps)(LeaderBoard)