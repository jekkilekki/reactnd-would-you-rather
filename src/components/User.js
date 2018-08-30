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

		let rankDigit = rank === 11 || rank === 12 || rank === 13 ? '0' : rank.toString().split('').pop(),
				rankSuffix = ''
		switch(rankDigit) {
			case '1':
				rankSuffix = 'st'
				break;
			case '2':
				rankSuffix = 'nd'
				break;
			case '3': 
				rankSuffix = 'rd'
				break;
			default:
				rankSuffix = 'th'
		}
		
		return (
			<tr className={'user ' + (authedUser === user.id ? 'current-user z-depth-3' : '')}>
				<td className='leaderboard-rank rank'>
					<span className='new badge' data-badge-caption={rankSuffix}>{rank}</span>
				</td>
				<td className='leaderboard-user'>
					<div 
						style={{backgroundImage: `url(${avatarURL})`}}
						alt={`Avatar of ${name}`}
						className={'avatar ' + (authedUser === user.id ? 'z-depth-1' : '')}
					></div>
					<p className='author'>{name}
						{/* { authedUser === user.id && <i className='material-icons'>star</i> } */}
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