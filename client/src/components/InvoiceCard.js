import React from 'react'
import {
	CssBaseline,
	Paper,
	Typography,
	makeStyles,
	Button,
	Chip
} from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import Moment from 'moment'

import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
	invoiceCardContainer: {
		padding: '1rem 2rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
		marginBottom: '1rem',
		boxShadow: theme.boxShadow.lg,
		[theme.breakpoints.down('xs')]: {
			display: 'block',
		},
	},
	cardRight: {
		display: 'flex',
		flexDirection: 'row',
	},
	invoiceAmount: {
		margin: 'auto',
		padding: '0 12px',
		flexDirection: 'row'
	},
	moreBtn: {
		textDecoration: 'none'
	},
	chip: {
		background: theme.palette.invoiceStatus.paid, 
		color: '#fff'
	}
}))

const InvoiceCard = ({ email, description, issuedDate, amount, paid, invoiceId }) => {
	const classes = useStyles()
	const theme = useTheme()

	const formatCurrency = new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'}).format(amount)

	return (
		<Paper className={classes.invoiceCardContainer} elevation={3}>
			<CssBaseline />
			<div className={classes.cardContainer}>
				<Typography variant='body1'>{email}</Typography>
				<Typography fontWeight='fontWightBold' variant='body1'>{description}</Typography>
				<Typography variant='caption'>
					{Moment(issuedDate).format('ll')}
				</Typography>
			</div>
			<div  className={classes.cardRight}>
				<div className={classes.invoiceAmount}>
					<Chip label={paid ? `${formatCurrency} Paid` : `${formatCurrency} Unpaid`} className={classes.chip} />
				</div>
				<div>
					<Link className={classes.moreBtn} to={`/invoice/${invoiceId}`}><Button variant='contained' color='secondary'>More</Button></Link>
				</div>
			</div>
		</Paper>
	)
}

export default InvoiceCard
