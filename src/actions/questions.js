import { saveQuestionAnswer, saveQuestion } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion( question ) {
	return {
		type: ADD_QUESTION,
		question
	}
}

export function handleAddQuestion( optionA, optionB ) {
	return ( dispatch, getState ) => {
		const { authedUser } = getState()
		dispatch( showLoading() )

		return saveQuestion({
			optionA,
			optionB,
			author: authedUser
		})
			.then((question) => dispatch( addQuestion( question ) ) )
			.then(() => dispatch( hideLoading() ) )
	}
}

export function receiveQuestions( questions ) {
	return {
		type: RECEIVE_QUESTIONS,
		questions
	}
}

function answerQuestion({ id, authedUser, hasAnswered }) {
	return {
		type: ANSWER_QUESTION,
		id,
		authedUser,
		hasAnswered
	}
}

export function handleAnswerQuestion( data ) {
	return (dispatch) => {
		dispatch( answerQuestion( data ) )

		return saveQuestionAnswer( data )
			.catch((e) => {
				console.warn( 'Error in handleAnswerQuestion: ', e )
				dispatch( answerQuestion( data ) )
				alert( 'There was an error answering the question. Please try again.' )
			})
	}
}