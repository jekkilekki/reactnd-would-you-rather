import React, { Component } from 'react'
import { connect } from 'react-redux'
import { object, func, string } from 'prop-types'
import { formatQuestion, formatDate } from '../utils/helpers'

class User extends Component {
	// static propTypes = {
	// 	question: object.isRequired,
	// 	dispatch: func.isRequired,
	// 	history: object.isRequired,
	// 	authedUser: string.isRequired
	// }

	render() {
		const { user, authedUser, rank, options } = this.props
		const { name, avatarURL, answers, questions } = user

		if ( options === 'picture-only' ) {
			return (
				<div 
					style={{backgroundImage: `url(${avatarURL})`}}
					alt={`Avatar of ${name}`}
					className={'avatar ' + (authedUser === user.id ? 'z-depth-1' : '')}
				></div>
			)
		}
		
		return (
			<tr className={'user ' + (authedUser === user.id ? 'current-user z-depth-3' : '')}>
				<td className='leaderboard-rank rank'>
					{rank}
				</td>
				<td className='leaderboard-user'>
					<div 
						style={{backgroundImage: `url(${avatarURL})`}}
						alt={`Avatar of ${name}`}
						className={'avatar ' + (authedUser === user.id ? 'z-depth-1' : '')}
					></div>
					<p className='author'>{name}
						{ authedUser === user.id && <small><em> (That's you!)</em></small> }
					</p>
				</td>
				<td className='leaderboard-answered answered teal lighten-2'>
					{Object.keys(answers).length}
				</td>
				<td className='leaderboard-asked created teal lighten-3'>
					{questions.length}
				</td>
				<td className='leaderboard-score score purple lighten-2'>
					{Object.keys(answers).length + questions.length}
				</td>
			</tr>
		)
	}
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
	const user = users[id]
	return {
    authedUser,
    user,
	}
}

export default connect(mapStateToProps)(User)