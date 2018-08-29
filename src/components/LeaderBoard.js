import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class LeaderBoard extends Component {
	render() {
		const { users } = this.props

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
					{this.props.userIds.map((id, i) => (
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