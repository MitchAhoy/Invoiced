import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/user.context'
import {
	Container,
	CssBaseline,
	Typography,
	makeStyles,
	Fab,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import InvoiceCard from './InvoiceCard'
import InvoiceDetailedCard from './InvoiceDetailedCard'

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	},
}))

const Dashboard = () => {
	const { invoices } = useContext(UserContext)



	const classes = useStyles()

	return (
		<Container>
			<Typography variant='h3' gutterBottom>
				Recent Invoices
			</Typography>
			<CssBaseline />
			<Container>
				{invoices && invoices.length > 0
					? invoices.map(
							({ email, description, amount, paid, _id, issuedDate, invoiceId }) => (
								<InvoiceCard
									key={_id}
									invoiceId={invoiceId}
									email={email}
									description={description}
									amount={amount}
									paid={paid}
									issuedDate={issuedDate}
								/>
							)
					  )
					: 'Create your first invoice!'}
			</Container>


			<Link to='/create/invoice'>
				<Fab
					className={classes.fab}
					aria-label='create-invoice'
					color='primary'
				>
					<AddIcon />
				</Fab>
			</Link>
		</Container>
	)
}

export default Dashboard
