import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Link, NavLink } from 'react-router-dom'
import { SideNav } from 'react-materialize'

class Nav extends Component {
	logout = () => {
		this.props.dispatch( setAuthedUser( null ) )
	}

	render() {
		const { authedUser, users } = this.props
		const loggedinUser = users[authedUser]

		return (
			<Fragment>
				<nav className='nav main-navigation teal'>
					<div className='nav-wrapper'>
						<ul className='hide-on-med-and-down'>
							<li>
								<Link to='/'><i className='material-icons'>home</i></Link>
							</li>
							{ authedUser &&
							<Fragment>
								<li>
									<Link to='/dashboard/unanswered'>Dashboard</Link>
								</li>
								<li>
									<Link to='/add'>Add Question</Link>
								</li>
								<li>
									<Link to='/leaderboard'>Leaderboard</Link>
								</li>
							</Fragment>
							}
						</ul>

						<SideNav className='sidenav teal'
							trigger={<i className='sidenav-trigger material-icons hide-on-large-only'>menu</i>}
							options={{ closeOnClick: true }}
							>
							<li className='sidenav-link'><a className='sidenav-close'><i className='material-icons'>close</i></a></li>
							<li className='sidenav-link'><NavLink to='/'><i className='material-icons home-link white-text'>home</i></NavLink></li>
							{ authedUser && 
							<Fragment>
								<li className='sidenav-link'><NavLink to='/dashboard/unanswered'>Dashboard</NavLink></li>
								<li className='sidenav-link'><NavLink to='/add'>Add Question</NavLink></li>
								<li className='sidenav-link'><NavLink to='/leaderboard'>Leaderboard</NavLink></li>
								<li className='sidenav-link'><a 
									className='logout-button'
									onClick={this.logout}
								>Logout</a>
								</li>
							</Fragment>
							}
							{ ! authedUser &&
								<li className='sidenav-link'><NavLink to='/login'>Login</NavLink></li>
							}
						</SideNav>
						
						<div className='loggedin right'>
							{ authedUser &&
							<Fragment>
								<span>{loggedinUser.name}</span>
								<div 
									className='loggedin-avatar' 
									title={loggedinUser.name}
									style={{backgroundImage: `url(${loggedinUser.avatarURL})`}} 
								></div>
								<span className='logout-button' onClick={this.logout}>
									Logout
								</span>
							</Fragment>
							}
							{ ! authedUser &&
								<Link to='/login'>Login</Link>
							}
						</div>
					</div>
				</nav>
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