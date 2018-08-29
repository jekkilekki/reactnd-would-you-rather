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
			const { authedUser, id, choice } = action
			return {
				...state,
				[id]: {
					...state[id],
					[choice]: {
						...state[id][choice],
						votes: state[id][choice].votes.concat([authedUser])
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
			// const { id } = action
			return {
				...state.filter((question) => question.id !== action.id),
			}
		default:
			return state;
	}
}