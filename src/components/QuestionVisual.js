import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { formatQuestion, formatDate } from '../utils/helpers'

class QuestionVisual extends Component {
  // state = {
  //   render: false
  // }

  // componentDidMount() {
  //   setTimeout(function() { //Start the timer
  //       this.setState({render: true}) //After 1 second, set render to true
  //   }.bind(this), 1000)
  // }

  render() {
    // const { view } = this.props.match.params
    const { optionOne, optionTwo, authedUser } = this.props
    // console.log( "View: ", view )

    let answers = optionOne.votes.length + optionTwo.votes.length,
        answered = optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)

    let optionOneScore = Math.trunc(optionOne.votes.length / answers * 100),
				optionOneGradient = answered && optionOneScore > 0
					? `linear-gradient(to right, #80cbc4 ${optionOneScore}%, #cfd8dc ${optionOneScore}%)` 
					: 'linear-gradient(to right, #cfd8dc 0%, #cfd8dc 100%)',
				optionTwoScore = Math.trunc(optionTwo.votes.length / answers * 100),
				optionTwoGradient = answered && optionTwoScore > 0
					? `linear-gradient(to right, #ce93d8 ${optionTwoScore}%, #cfd8dc ${optionTwoScore}%)` 
					: 'linear-gradient(to right, #cfd8dc 0%, #cfd8dc 100%)'

    // const Visual = (
      return (
      <div className='results'>
        <h3 className='section-title'>Poll Results</h3>
        <p 
          className='optionOne-result'
          style={{backgroundImage: `${optionOneGradient}`}}
        >
          <span className='result-text'>{optionOne.text}</span>
          <span>
            <strong className='result-score'>{optionOneScore}%</strong>
            <span className='result-votes'>{optionOne.votes.length} {optionOne.votes.length === 1 ? 'Vote' : 'Votes'}</span>
          </span>
        </p>
        <p 
          className='optionTwo-result'
          style={{backgroundImage: `${optionTwoGradient}`}}
        >
          <span className='result-text'>{optionTwo.text}</span>
          <span>
            <strong className='result-score'>{optionTwoScore}%</strong>
            <span className='result-votes'>{optionTwo.votes.length} {optionTwo.votes.length === 1 ? 'Vote' : 'Votes'}</span>
          </span>
        </p>
      </div>
    )

    // if ( this.state.render ) {
    //   return Visual
    // } else {
    //   return null
    // }
  }
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser
	}
}

export default connect(mapStateToProps)(QuestionVisual)