import React, { useContext } from 'react'
import { InvoicesContext } from '../contexts/invoices.context'
import {
	Container,
	CssBaseline,
	Paper,
	Typography,
	makeStyles,
	Fab,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import InvoiceCard from './InvoiceCard'

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	},
}))

const Dashboard = () => {
	const { invoices } = useContext(InvoicesContext)

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
							({ email, deliverables, amount, paid, _id, issuedDate }) => (
								<InvoiceCard
									key={_id}
									email={email}
									deliverables={deliverables}
									amount={amount}
									paid={paid}
									issuedDate={issuedDate}
								/>
							)
					  )
					: 'nothing'}
			</Container>
			<Link to='/new/invoice'>
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
