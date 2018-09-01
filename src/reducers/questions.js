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
				[question.id]: question
			}
		case DELETE_QUESTION:
			const { id } = action
			console.log( "State: ", state )
			
			const questionToDelete = action.id 
			console.log ( "Question to Delete")
			// newState.splice( questionToDelete, 1 )
			delete state.id
			return state
			// const { id } = action
			// console.log( state )
			// return {
			// 	questions: state.filter(({id}) => id !== action.id),
			// }
		default:
			return state;
	}
}