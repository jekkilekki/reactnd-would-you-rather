import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import AddQuestion from './AddQuestion'

class QuestionSingle extends Component {
    render() {
        const { id, answers } = this.props
        return (
            <div>
                <Question id={id} />
                <AddQuestion id={id} />
                <ul className='question-list'>
                    {answers.map((answerId) => (
                        <li key={answerId}>
                            <Question id={answerId} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, questions, users }, props ) {
    const { id } = props.match.params

    return {
        id,
        answers: !questions[id]
            ? []
            : questions[id].answers.sort((a, b) => questions[b].timestamp - questions[a].timestamp )
    }
}

export default connect(mapStateToProps)(QuestionSingle)