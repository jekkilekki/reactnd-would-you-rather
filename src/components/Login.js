import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Dropdown, NavItem } from 'react-materialize'

class Login extends Component {
	state = {
		uid: '',
		selectedUser: null,
		loggedIn: false
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { uid } = this.state
		const { dispatch, history } = this.props

		try {
			dispatch(setAuthedUser(uid))
			this.setState({
				loggedIn: true
			})
		} catch (e) {
			alert(e.message)
		} 
	}

	handleSelect = (e) => {
		const { users } = this.props
		const uid = e.target.id

		this.setState({ 
			uid: uid,
			selectedUser: users.filter((user) => user.id === uid) 
		})
	}

	render() {
		const { users, authedUser } = this.props
		const { uid, selectedUser } = this.state

		if ( authedUser ) {
			return <Redirect to='/dashboard/unanswered' />
		}

		return (
			<section className='page-content login-page'>
				<form 
					className='login card'
					onSubmit={this.handleSubmit}	
				>
					<h1 className='page-title center'>Login</h1>
					{ uid !== '' &&
						<div className='login-as center'>
							<div
								style={{backgroundImage: `url(${selectedUser[0].avatarURL})`}}
								alt={`Avatar of ${selectedUser[0].name}`}
								className='avatar'
							>
							</div>
							<p>Login as <strong>{selectedUser[0].name}</strong></p>
							{/* <input type='password' placeholder='password' /> */}
						</div>
					}
					<Dropdown trigger={
						<div className='login-dropdown user-select'>Select User</div>
					}>
						{users.map((user) => (
							<NavItem 
								key={user.id}
								id={user.id} 
								className={`login-dropdown ${user.id}`}
								onClick={this.handleSelect}>
								<div id={user.id}>
									<div 
										style={{backgroundImage: `url(${user.avatarURL})`}} 
										title={user.name} 
										className='avatar'>
									</div>
									<span className='user'>{user.name}</span>
								</div>
							</NavItem>
						))}
					</Dropdown>
					<button
						className='btn waves-effect waves-light'
						type='submit'
						disabled={ null === selectedUser }
					>
					Login
					</button>
					<p className='center'>Not a member yet? <a href="#">Sign up</a></p>
				</form>
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