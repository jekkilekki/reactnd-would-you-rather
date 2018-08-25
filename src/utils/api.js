import {
	_getUsers,
	_getQuestions,
	_saveQuestionAnswer,
	_saveQuestion
} from './_DATA.js'

export function getInitialData() {
	return Promise.all([
		_getUsers(),
		_getQuestions(),
	]).then(([users, questions]) => ({
		users,
		questions
	}))
}

export function saveQuestionAnswer(data) {
	return _saveQuestionAnswer(data)
}

export function saveQuestion(data) {
	return _saveQuestion(data)
}