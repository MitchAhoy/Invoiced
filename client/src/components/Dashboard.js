import React, { useContext, useEffect, memo } from 'react'
import { UserContext } from '../contexts/user.context'
import {
	Container,
	CssBaseline,
	Typography,
	makeStyles,
	Fab,
} from '@material-ui/core'
import {
	Add as AddIcon
} from '@material-ui/icons'
import { Link } from 'react-router-dom'
import InvoiceTable from './InvoiceTable'

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
	const classes = useStyles()


	return (
		<Container>

			<Typography variant='h3' gutterBottom>
				Your invoices
					</Typography>

			<CssBaseline />
			<Container>
				{invoices.length > 0 ? <InvoiceTable invoices={invoices} /> : 'create an invoice'}
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
