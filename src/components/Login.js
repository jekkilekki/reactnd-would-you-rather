import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'
import { Dropdown, NavItem } from 'react-materialize'
import Nav from './Nav'

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

	handleSelect = (e) => {
		console.log(e.target.id)
		this.props.dispatch( setAuthedUser( e.target.id ) )
	}

	render() {
		const { users, authedUser } = this.props

		if ( authedUser ) {
			return <Redirect to='/' />
		}

		return (
			<Fragment>
				{ ! authedUser && <Nav /> }
			<section className='page-content login-page'>
				<form 
					className='login card'
					onSubmit={this.handleSubmit}	
				>
					<h1 className='page-title center'>Login</h1>
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
						disabled={ null === authedUser }
					>
					Login
					</button>
					<p className='center'>Not a member yet? <a href="#">Sign up</a></p>
				</form>
			</section>
			</Fragment>
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