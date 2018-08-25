import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: ''
	}

	handleChange = (e) => {
		const text = e.target.value
		this.setState((prevState) => ({
			text
		}))
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOne, optionTwo } = this.state
		const { dispatch } = this.props
		dispatch( handleAddQuestion( optionOne, optionTwo ))

		this.setState(() => ({
			optionOne: '',
			optionTwo: ''
		}))
	}

	render() {
		const { optionA, optionB } = this.state

		{/* Redirect to home view after submit */}

		return (
			<div>
				<h3 className='center'>Ask a Question</h3>
				<h4 className='center'>Would you rather...?</h4>
				<form className='add-question-form' onSubmit={this.handleSubmit}>
					<input
						placeholder='Option A'
						value={optionA}
						onChange={this.handleChange}
						className='option-input'
						maxLength={100}
					/>
					<h5 className='center or'>or</h5>
					<input
						placeholder='Option B'
						value={optionB}
						onChange={this.handleChange}
						className='option-input'
						maxLength={100}
					/>
					<button
						className='btn'
						type='submit'
						disabled={ '' === optionA || '' === optionB }
					>
					Ask Question
					</button>
				</form>
			</div>
		)
	}
}

export default connect()(AddQuestion)