import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const DELETE_QUESTION = 'DELETE_QUESTION'

/**
 * Receive Questions
 */
export function receiveQuestions( questions ) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

/**
 * Answer Question
 */
function answerQuestion({ id, authedUser, choice }) {
	return {
		type: ANSWER_QUESTION,
		id,
		authedUser,
		choice
	}
}

export function handleAnswerQuestion( choice ) {
	return (dispatch) => {
		dispatch( answerQuestion( choice ) )

		return saveQuestionAnswer( choice )
			.catch((e) => {
				console.warn( 'Error in handleAnswerQuestion: ', e )
				dispatch( answerQuestion( choice ) )
				alert( 'There was an error answering the question. Please try again.' )
			})
	}
}

/**
 * Add Question
 */
function addQuestion( question ) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function handleAddQuestion( optionOneText, optionTwoText ) {
	return ( dispatch, getState ) => {
		const { authedUser } = getState()
		dispatch( showLoading() )

		return saveQuestion({
			optionOneText,
			optionTwoText,
			author: authedUser
		})
			.then((question) => {
				dispatch( addQuestion( question ) )
			})
			.then(() => dispatch( hideLoading() ) )
			.catch((e)=>{
				console.warn("Error in saving Question: ",e)
				alert('There was an error while adding the question Try again')
			})
	}
}

/**
 * Delete question
 */
function deleteQuestion( id ) {
	return {
		type: DELETE_QUESTION,
		id
	}
}

export function handleDeleteQuestion( id ) {
	return ( dispatch ) => {
		dispatch( deleteQuestion( id ) )
	}
}