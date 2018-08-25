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
		const { user } = this.props

		const { name, avatarURL, answers, questions } = user
		
		return (
			<div className='user card'>
				<div 
					style={{backgroundImage: `url(${avatarURL})`}}
					alt={`Avatar of ${name}`}
					className='avatar'
				></div>
				<div className='question-meta'>
          <h4 className='author'>{name}</h4>
					<div className='answered'>Questions answered: {Object.keys(answers).length}</div>
					<div className='created'>Questions created: {questions.length}</div>
          <div className='score'>Total score: {Object.keys(answers).length + questions.length}</div>
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