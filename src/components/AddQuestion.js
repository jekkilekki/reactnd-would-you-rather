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
		const { optionOne, optionTwo } = this.state

		{/* Redirect to home view after submit */}

		return (
			<section className='page-content'>
				<h1 className='center'>Ask a Question</h1>
				<div class='card'>
					<h4 className='center'>Would you rather...?</h4>
					<form 
						className='add-question-form' 
						onSubmit={this.handleSubmit}
					>
						<input
							placeholder='Option One'
							value={optionOne}
							onChange={this.handleChange}
							className='option-input'
							maxLength={100}
						/>
						<h4 className='center or'>or</h4>
						<input
							placeholder='Option Two'
							value={optionTwo}
							onChange={this.handleChange}
							className='option-input'
							maxLength={100}
						/>
						<button
							className='btn waves-effect waves-light'
							type='submit'
							disabled={ '' === optionOne || '' === optionTwo }
						>
						Ask Question
						</button>
					</form>
				</div>
			</section>
		)
	}
}

export default connect()(AddQuestion)