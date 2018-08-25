import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion, formatDate } from '../utils/helpers'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import { handleAnswerQuestion } from '../actions/questions'

class Question extends Component {
    function handleAnswer = (e) => {
        e.preventDefault()

        const { dispatch, question, authedUser } = this.props
        dispatch( handleAnswerQuestion ({
            id: question.id,
            hasAnswered: question.hasAnswered,
            authedUser
        }))
    }

    render() {
        const { question } = this.props
        if ( null === question ) {
            return <p>This question doesn't exist.</p>
        }

        const {
            name, avatar, timestamp, optionA, optionB, hasAnswered, answers
        } = question
        
        return (
            <div className='question'>
                <img 
                    src={avatar}
                    alt={`Avatar of ${name}`}
                    className='avatar'
                />
                <div className='question-meta'>
                    <span className='timestamp'>{formatDate(timestamp)}</span>
                    <span className='author'>{name}</span> asks
                </div>
                <div className='options'>
                    <button
                        className='optionA'
                        onClick={(e) => this.optionA(e, id)}>
                        {optionA}
                    </button>
                    <button
                        className='optionB'
                        onClick={(e) => this.optionB(e, id)}>
                        {optionB}
                    </button>
                </div>
                <div className='question-icons'>
                    <TiArrowBackOutline className='return-to-dashboard' />
                    <span>{answers !== 0 && answers}</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
    const question = questions[id]
    return {
        authedUser,
        question: formatQuestion( question, users[question.author], authedUser )
    }
}

export default connect(mapStateToProps)(Question)