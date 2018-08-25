import React, { Component } from 'react'
import { connect } from 'react-redux'
import { array } from 'prop-types'
import Question from './Question'

class Dashboard extends Component {
	static propTypes = {
		questionIds: array.isRequired
	}

	render() {
		return (
			<section className='page-content'>
				<h2 className='center'>Your Questions</h2>
				<ul className='dashboard-question-list'>
					{this.props.questionIds.map((id) => (
						<li key={id} className={`question-${id}`}>
							<Question id={id} />
						</li>
					))}
				</ul>
			</section>
		)
	}
}

function mapStateToProps({ questions }) {
    return {
        questionIds: Object.keys(questions)
            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard)