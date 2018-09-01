import { 
	RECEIVE_QUESTIONS, 
	ANSWER_QUESTION, 
	ADD_QUESTION,
	DELETE_QUESTION
} from '../actions/questions'

export default function questions( state = {}, action ) {
	switch ( action.type ) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions
			}
		case ANSWER_QUESTION:
			const { authedUser, qid, answer } = action
			return {
				...state,
				[qid]: {
					...state[qid],
					[answer]: {
						...state[qid][answer],
						votes: state[qid][answer].votes.concat([authedUser])
					}
				}
			}
		case ADD_QUESTION: 
			const { question } = action
			return {
				...state,
				[question.id]: action.question
			}
		case DELETE_QUESTION:
			const { id } = action
			return {
				...state,
				...state.filter((question) => question.id !== id),
			}
		default:
			return state;
	}
}