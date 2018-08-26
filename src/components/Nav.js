import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Link } from 'react-router-dom'
import { SideNav, SideNavItem, Button } from 'react-materialize'

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
					{ authedUser && 
					<div className='nav-wrapper'>
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

						<SideNav className='sidenav teal'
							trigger={<i className='sidenav-trigger material-icons hide-on-large-only'>menu</i>}
							options={{ closeOnClick: true }}
							>
							<SideNavItem>
								<i className='material-icons'>close</i>
							</SideNavItem>
							<SideNavItem>
								<Link to='/'>Dashboard</Link>
							</SideNavItem>
							<SideNavItem>
								<Link to='/new'>New Question</Link>
							</SideNavItem>
							<SideNavItem>
								<Link to='/leaderboard'>Leaderboard</Link>
							</SideNavItem>
						</SideNav>

						<div className='loggedin right'>
							<span>Logged in as</span>
							<div 
								className='loggedin-avatar' 
								title={loggedinUser.name}
								style={{backgroundImage: `url(${loggedinUser.avatarURL})`}} 
							></div>
							<span className='logout-button' onClick={this.logout}>
								Logout
							</span>
						</div>
					</div>
					}
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