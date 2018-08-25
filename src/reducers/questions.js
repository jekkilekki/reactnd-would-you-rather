import { RECEIVE_QUESTIONS, ANSWER_QUESTION, ADD_QUESTION } from '../actions/questions'

export default function questions( state = {}, action ) {
	switch ( action.type ) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions
			}
		case ANSWER_QUESTION:
			return {
				...state,
				[action.id]: {
					...state[action.id],
					answers: action.hasAnswered === true
						? state[action.id].answers.filter( (uid) => uid !== action.authedUser )
						: state[action.id].answers.concat( [action.authedUser] )
				}
			}
		case ADD_QUESTION: 
			const { question } = action
			return {
				...state,
				[question.id]: action.question
			}
		default:
			return state;
	}
}