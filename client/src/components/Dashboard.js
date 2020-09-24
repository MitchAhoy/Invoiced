import React, { useContext, useEffect, memo } from 'react'
import { UserContext } from '../contexts/user.context'
import {
	Container,
	CssBaseline,
	Typography,
	makeStyles,
	Fab,
	IconButton
} from '@material-ui/core'
import {
	Add as AddIcon, 
	FilterList as FilterListIcon
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import InvoiceCard from './InvoiceCard'

const useStyles = makeStyles((theme) => ({
	fab: {
		position: 'fixed',
		right: theme.spacing(2),
		bottom: theme.spacing(2),
	},
	dashboardHead: {
		display: 'flex',
		justifyContent: 'space-between'
	}
}))

const Dashboard = () => {
	const { invoices, getUserData } = useContext(UserContext)

	useEffect(() => {
		getUserData()
	}, [])

	console.log('dashboard render')

	const classes = useStyles()


	return (
		<Container>

					<Typography variant='h3' gutterBottom>
						Your invoices
					</Typography>

			<CssBaseline />
			<Container>
				{invoices && invoices.length > 0
					? invoices.map(
							({ customerEmail, description, amount, paid, _id, issueDate, invoiceId, status }) => (
								<InvoiceCard
									key={_id}
									invoiceId={invoiceId}
									customerEmail={customerEmail}
									description={description}
									amount={amount}
									paid={paid}
									issueDate={issueDate}
									status={status}
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

export default memo(Dashboard)
