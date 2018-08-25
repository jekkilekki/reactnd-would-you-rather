import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {
	state = {
		uname: '',
		fname: ''
	}

	handleChange = (e) => {
		const text = e.target.value
		this.setState((prevState) => ({
			text
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { uname, fname } = this.state
		// const { dispatch } = this.props
		// dispatch( handleAddQuestion( optionOne, optionTwo ))

		this.setState(() => ({
			uname: '',
			fname: ''
		}))
	}

	render() {
		const { authedUser } = 'tyler'
		const { uname, fname } = this.state

		return (
			<section className='page-content'>
				<form 
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
				</form>

				<form 
					className='login card'
					onSubmit={this.handleSubmit}	
				>
					<h1 className='page-title center'>Login</h1>
					<select id='user-select'>
						<option value='tyler'>Tyler McGinniss</option>
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
			</section>
		)
	}
}

function mapStateToProps() {

}

export default connect(mapStateToProps)(Login)