import React, { useContext, useState } from 'react'
import { InvoicesContext } from '../contexts/invoices.context'
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
	const { invoices } = useContext(InvoicesContext)
	const [isReviewingInvoice, setisReviewingInvoice] = useState(false)
	const [detailedInvoice, setDetailedInvoice] = useState([])
	// const displayDetailedCard = (id) => {
	// 	const specInvoice = invoices.filter(i => i._id == id)
	// 	setDetailedInvoice(specInvoice)
	// 	setisReviewingInvoice(!isReviewingInvoice)
	// }

	const classes = useStyles()

	return (
		<Container>
			<Typography variant='h3' gutterBottom>
				Recent Invoices
			</Typography>
			<CssBaseline />
			<Container>
				{invoices && invoices.length > 0 && !isReviewingInvoice
					? invoices.map(
							({ email, deliverables, amount, paid, _id, issuedDate }) => (
								<InvoiceCard
									key={_id}
									id={_id}
									email={email}
									deliverables={deliverables}
									amount={amount}
									paid={paid}
									issuedDate={issuedDate}
									// displayDetailedCard={displayDetailedCard}
								/>
							)
					  )
					: 'Create your first invoice!'}
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
