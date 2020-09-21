import React, { useContext } from 'react'
import { UserContext } from '../contexts/user.context'
import { Container, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const InvoiceDetailedCard = ({match: { params: { invoiceId }}}) => {

	const { invoices } = useContext(UserContext)
	const currentInvoice = invoices.length > 0 ? invoices.filter(i => i.invoiceId === invoiceId) : {}

	console.log(currentInvoice)
	return (
		<Container>
			<h2>{currentInvoice.amount}</h2>

			<Link to={'/dashboard'} underline='none'>
				<Button variant='contained' color='secondary'>
					Go Back
				</Button>
			</Link>
		</Container>
	)
}

export default InvoiceDetailedCard
