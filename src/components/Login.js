import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'

class Login extends Component {
	state = {
		id: '',
		loggedIn: false
	}

	handleChange = (e, {value}) => {
		this.setState({ 
			id:value 
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { id } = this.state
		const { dispatch } = this.props
		dispatch( setAuthedUser( id ))

		this.setState({
			loggedIn: true
		})
	}

	render() {
		const { users, authedUser } = this.props
		const { id, loggedIn } = this.state
		const userInfo = users.map((user) => ({
			text: user.name,
			value: user.id,
			image: {avatar: true, src: user.avatarURL},
			key: user.id
		}))

		if ( loggedIn ) {
			return <Redirect to='/' exact component={Dashboard} />
		}

		return (
			<section className='page-content login-page'>
				<form 
					className='login card'
					onSubmit={this.handleSubmit}	
				>
					<h1 className='page-title center'>Login</h1>
					<select id='user-select'>
						{users.map((user) => (
							<option value={user.id}>{user.name}</option>
						))}
					</select>
					<button
						className='btn waves-effect waves-light'
						type='submit'
						disabled={ '' === authedUser }
					>
					Login
					</button>
					<p className='center'>Not a member yet? <a href="#">Sign up</a></p>
				</form>

				{/* <form 
					className='login card'
					onSubmit={this.handleSubmit}	
				>
					<h1 className='page-title center'>Sign up</h1>
					<input
						placeholder='Username'
						onChange={this.handleChange} />
					<input
						placeholder='Full Name'
						onChange={this.handleChange} />
					<button
						className='btn waves-effect waves-light'
						type='submit'
						disabled={ '' === uname || '' === fname }
					>
					Sign up
					</button>
					<p className='center'>Already a member? <a href="#">Login</a></p>
				</form> */}
			</section>
		)
	}
}

function mapStateToProps({users, authedUser}) {
	return {
		users: Object.keys(users).map((id) => (users[id])),
		authedUser
	}
}

export default connect(mapStateToProps)(Login)