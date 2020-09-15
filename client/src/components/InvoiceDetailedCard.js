import React from 'react'
import { Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const InvoiceDetailedCard = () => {
	return (
		<Container>
			<h2>Details</h2>

			<Link to={'/dashboard'} underline='none'>
				<Button variant='contained' color='secondary'>
					Go Back
				</Button>
			</Link>
		</Container>
	)
}

export default InvoiceDetailedCard
