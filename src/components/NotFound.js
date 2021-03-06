import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<section className="page-content card">
			<h1 className="page-title not-found center">404 Not Found</h1>
			<div className="entry-content not-found center">
				<p>Whoops, we couldn't find the page you wanted.</p>
				<p>Perhaps try again from the <Link to='/dashboard'>Dashboard</Link>?</p>
			</div>
		</section>
	)
}

export default NotFound