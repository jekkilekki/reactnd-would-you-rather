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
		const { user, authedUser, rank } = this.props

		const { name, avatarURL, answers, questions } = user
		
		return (
			<div className={'user card ' + (authedUser === user.id ? 'current-user z-depth-3' : '')}>
				<span className='rank'>{rank}</span>
				<div 
					style={{backgroundImage: `url(${avatarURL})`}}
					alt={`Avatar of ${name}`}
					className={'avatar ' + (authedUser === user.id ? 'z-depth-1' : '')}
				></div>
        <h4 className='author center'>{name}
          { authedUser === user.id && <small><em> (That's you!)</em></small> }
        </h4>
        <p className='question-meta-title'>Questions</p>
				<div className='question-meta'>
					<div className='answered teal lighten-2'>
            <p>Answered:</p>
            <h2>{Object.keys(answers).length}</h2>
          </div>
					<div className='created teal lighten-3'>
            <p>Created:</p>
            <h2>{questions.length}</h2>
          </div>
          <div className='score purple lighten-2'>
            <p>Score:</p>
            <h2>{Object.keys(answers).length + questions.length}</h2>
          </div>
				</div>
			</div>
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