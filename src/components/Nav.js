import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Nav extends Component {
	render() {
		const { authedUser, users } = this.props
		const loggedinUser = users[authedUser]

		return (
			<Fragment>
				<nav className='nav main-navigation teal'>
					<div className='nav-wrapper'>
						<a data-target='mobile-demo' className='sidenav-trigger'>
							<i className='material-icons'>menu</i>
						</a>
						<ul className='hide-on-med-and-down'>
							<li>
								<Link to='/'>Dashboard</Link>
							</li>
							<li>
								<Link to='/new'>New Question</Link>
							</li>
							<li>
								<Link to='/leaderboard'>Leaderboard</Link>
							</li>
						</ul>

						<div className='loggedin right'>
							<span>Logged in as</span>
							<div 
								className='loggedin-avatar' 
								title={loggedinUser.name}
								style={{backgroundImage: `url(${loggedinUser.avatarURL})`}} 
							></div>
							<span><Link to='/login'>Logout</Link></span>
						</div>
					</div>
				</nav>

				<ul className='sidenav' id='mobile-demo'>
					<li><Link to='/'>Dashboard</Link></li>
					<li><Link to='/new'>New Question</Link></li>
					<li><Link to='/leaderboard'>Leaderboard</Link></li>
				</ul>
			</Fragment>
		)
	}
}

function mapStateToProps({ users, authedUser }) {
	return {
		authedUser,
		users
	}
}

export default connect(mapStateToProps)(Nav)