import React, { useContext } from 'react'
import { UserContext } from '../contexts/user.context'
import { makeStyles, Button, Typography, Paper, Chip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import formatUnixDate from '../utils/formatUnixDate'




const useStyles = makeStyles((theme) => ({
	invoiceContainer: {
		maxWidth: '700px',
		margin: '2rem auto',
	},
	cardContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		[theme.breakpoints.down('xs')]: {
			display: 'block'
		},
	},
	invoiceSheet: {
		padding: '2rem 2rem',
		boxShadow: theme.boxShadow.xxl
	},
	backBtn: {
		margin: '2rem auto'
	},
	chip: {
		background: theme.palette.invoiceStatus.open, 
		color: '#fff'
	},
	ctaBtnContainer: {
		display: 'flex',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap'
	},
	ctaBtn: {
		textDecoration: 'none'
	}
	
}))

const InvoiceDetailedCard = ({
	match: {
		params: { invoiceId },
	},
}) => {

	const classes = useStyles()

	const { invoices, customers } = useContext(UserContext)
	const currentInvoice = invoices.length > 0 ? invoices.filter((i) => i.invoiceId === invoiceId)[0] : {}
	const currentCustomer = customers.length > 0 ? customers.filter((c) => c.stripeID === currentInvoice.customer)[0] : {}

	const {
		amount,
		customer,
		description,
		invoicePdf,
		invoiceUrl,
		issueDate,
		paid,
		payableBy,
	} = currentInvoice
	const { name, address, email } = currentCustomer

	return (
		<div className={classes.invoiceContainer}>
		
			<Paper className={classes.invoiceSheet} elevation={0}>
				<div className={classes.cardContainer}>
					<div>
					<Typography variant='caption' fontWeight={500}>Bill to</Typography>
				<Typography variant='body1' gutterBottom>{email}</Typography>

				<Typography variant='caption' gutterBottom>Amount Due</Typography>
				<Typography variant='body1' gutterBottom>A${amount}</Typography>

				<Typography variant='caption' gutterBottom>Description</Typography>
				<Typography variant='body1' gutterBottom>{description}</Typography>

				<Typography variant='caption' gutterBottom>Due Date</Typography>
				<Typography variant='body1' gutterBottom>{formatUnixDate(payableBy)}</Typography>



					</div>

					<div>


				<Typography variant='caption' component='p' gutterBottom>Invoice #</Typography>
				<Typography variant='body1' gutterBottom>{invoiceId}</Typography>

				<Typography variant='caption' gutterBottom>Customer #</Typography>
				<Typography variant='body1' gutterBottom>{customer}</Typography>

				<Typography variant='caption' component='p' gutterBottom>Status</Typography>
				<Chip className={classes.chip} label='open' />
					</div>

				</div>



			</Paper>
			<div className={classes.ctaBtnContainer}>
			<Link to={'/dashboard'} underline='none' className={classes.ctaBtn}>
					<Button variant='contained' color='secondary' className={classes.backBtn}>
						Go Back
					</Button>
				</Link>
			<Link to={'/dashboard'} underline='none' className={classes.ctaBtn}>
					<Button variant='contained' color='secondary' className={classes.backBtn}>
						Void
					</Button>
				</Link>
			<Link to={'/dashboard'} underline='none' className={classes.ctaBtn}>
					<Button variant='contained' color='secondary' className={classes.backBtn}>
						Update
					</Button>
				</Link>
			<Link to={{pathname: invoicePdf}} target='_blank' underline='none' className={classes.ctaBtn}>
					<Button variant='contained' color='secondary' className={classes.backBtn}>
						PDF
					</Button>
				</Link>
			<Link to={'/dashboard'} underline='none' className={classes.ctaBtn}>
					<Button variant='contained' color='secondary' className={classes.backBtn}>
						Payment Link
					</Button>
				</Link>
			</div>
			</div>
	)
}

export default InvoiceDetailedCard
