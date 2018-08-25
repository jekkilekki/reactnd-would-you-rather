import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {
	render() {
		return (
			<nav className="nav main-navigation teal">
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/new">New Question</Link>
					</li>
					<li>
						<Link to="/leaderboard">Leaderboard</Link>
					</li>
					<li>
						<Link to="/login">Logout</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

export default Nav