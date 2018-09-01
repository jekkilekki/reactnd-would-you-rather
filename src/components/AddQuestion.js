import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class AddQuestion extends Component {
	state = {
		optionOne: '',
		optionTwo: ''
	}

	handleOptionOneChange = (e) => {
		const text = e.target.value
		this.setState({
			optionOne: text
		})
	}

	handleOptionTwoChange = (e) => {
		const text = e.target.value
		this.setState({
			optionTwo: text
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()

		const { optionOne, optionTwo } = this.state
		const { dispatch, history } = this.props

		try {
			dispatch( handleAddQuestion( optionOne, optionTwo ))
		
			this.setState(() => ({
				optionOne: '',
				optionTwo: ''
			}))

			history.push( '/dashboard/unanswered' )
		} catch (e) {
			alert(e.message)
		} 
	}

	render() {
		const { optionOne, optionTwo } = this.state

		return (
			<section className='page-content'>
				<h2 className='center'>Ask a Question</h2>
				<div className='question card'>
					<h4 className='center'>Would you rather...?</h4>
					<form 
						className='add-question-form' 
						onSubmit={this.handleSubmit}
					>
						<input
							placeholder='Option One'
							value={optionOne}
							onChange={this.handleOptionOneChange}
							className='option-input optionOne-input teal lighten-4'
							maxLength={100}
						/>
						<h4 className='center or'>or</h4>
						<input
							placeholder='Option Two'
							value={optionTwo}
							onChange={this.handleOptionTwoChange}
							className='option-input optionTwo-input purple lighten-4'
							maxLength={100}
						/>
						<button
							className='btn btn-large waves-effect waves-light'
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