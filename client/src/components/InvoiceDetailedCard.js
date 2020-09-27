import React, { useContext } from 'react'
import { UserContext } from '../contexts/user.context'
import { makeStyles, Button, Typography, Paper, Chip } from '@material-ui/core'
import { Link } from 'react-router-dom'
import formatUnixDate from '../utils/formatUnixDate'
import axios from 'axios'
import formatCurrency from '../utils/formatCurrency'




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
	chipvoid: {
		background: theme.palette.invoiceStatus.void,
		color: '#fff'
	},
	chipopen: {
		background: theme.palette.invoiceStatus.open,
		color: '#fff'
	},
	chippaid: {
		background: theme.palette.invoiceStatus.paid,
		color: '#fff'
	},
	chipoverdue: {
		background: theme.palette.invoiceStatus.overdue,
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

	const { invoices, customers, getUserData } = useContext(UserContext)
	const currentInvoice = invoices.length > 0 ? invoices.filter((i) => i.invoiceId === invoiceId)[0] : {}
	const currentCustomer = customers.length > 0 ? customers.filter((c) => c.stripeID === currentInvoice.customer)[0] : {}

	const {
		amount,
		customer,
		description,
		invoicePdf,
		invoiceUrl,
		issueDate,
		status,
		payableBy,
	} = currentInvoice
	const { name, address, email } = currentCustomer

	const voidInvoice = async () => {
		const confirmation = window.confirm('Are you sure you want to void this invoice? This action can not be undone.')
		if (confirmation) {
			try {
				const executeVoid = await axios.post(`/api/invoices/${invoiceId}/void`)
				const refreshData = await getUserData()
			} catch (err) {
				throw new Error(err)
			}
			
		}
		
	}

	return (
		<div className={classes.invoiceContainer}>

			<Paper className={classes.invoiceSheet} elevation={0}>
				<div className={classes.cardContainer}>
					<div>
						<Typography variant='caption'>Bill to</Typography>
						<Typography variant='body1' gutterBottom>{email}</Typography>
						<Typography variant='body1' gutterBottom>{name}</Typography>
						<Typography variant='body1' gutterBottom>{address}</Typography>

						<Typography variant='caption' gutterBottom>Amount Due</Typography>
						<Typography variant='body1' gutterBottom>{formatCurrency(amount)}</Typography>

						<Typography variant='caption' gutterBottom>Description</Typography>
						<Typography variant='body1' gutterBottom>{description}</Typography>

						<Typography variant='caption' gutterBottom>Issue Date</Typography>
						<Typography variant='body1' gutterBottom>{formatUnixDate(issueDate)}</Typography>

						<Typography variant='caption' gutterBottom>Due Date</Typography>
						<Typography variant='body1' gutterBottom>{formatUnixDate(payableBy)}</Typography>
					</div>

					<div>
						<Typography variant='caption' component='p' gutterBottom>Invoice #</Typography>
						<Typography variant='body1' gutterBottom>{invoiceId}</Typography>

						<Typography variant='caption' gutterBottom>Customer #</Typography>
						<Typography variant='body1' gutterBottom>{customer}</Typography>

						<Typography variant='caption' component='p' gutterBottom>Status</Typography>
						<Chip className={classes[`chip${status}`]} label={status} />
					</div>
				</div>

			</Paper>
			<div className={classes.ctaBtnContainer}>
				<Link to={'/dashboard'} underline='none' className={classes.ctaBtn}>
					<Button variant='contained' color='secondary' className={classes.backBtn}>
						Go Back
					</Button>
				</Link>

				{status === 'open' && (
					<>
					<div>
						<Button variant='contained' color='secondary' className={classes.backBtn} onClick={voidInvoice}>
								Void
						</Button>
					</div>

						<Link to={{ pathname: invoiceUrl }} target='_blank' underline='none' className={classes.ctaBtn}>
							<Button variant='contained' color='secondary' className={classes.backBtn}>
								Payment Link
							</Button>
						</Link>
					</>
				)}

				<Link to={{ pathname: invoicePdf }} target='_blank' underline='none' className={classes.ctaBtn}>
					<Button variant='contained' color='secondary' className={classes.backBtn}>
						PDF
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default InvoiceDetailedCard
