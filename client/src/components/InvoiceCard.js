import React from 'react'
import {
	CssBaseline,
	Paper,
	Typography,
	makeStyles,
	Button,
	Chip
} from '@material-ui/core'
import formatUnixDate from '../utils/formatUnixDate'
import formatCurrency from '../utils/formatCurrency'

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
			justifyContent: 'flex-start',
			display: 'block'
		},
	},
	cardRight: {
		display: 'flex',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'row-reversed',
			justifyContent: 'space-between',
			alignItems: 'center'
		}
	},
	invoiceStatus: {
		margin: 'auto',
		padding: '0 12px',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			margin: '0.5rem 0rem',
			padding: '0rem'
		}
	},
	moreBtn: {
		textDecoration: 'none'
	},
	chipvoid: {
		background: theme.palette.invoiceStatus.void,
		color: '#fff',
		[theme.breakpoints.down('xs')]: {
			margin: '0px'
		}
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
	}
}))

const InvoiceCard = ({ customerEmail, description, issueDate, amount, status, invoiceId }) => {
	const classes = useStyles()

	return (
		<Paper className={classes.invoiceCardContainer} elevation={3}>
			<CssBaseline />
			<div className={classes.cardContainer}>
				<Typography variant='body1' gutterBottom>{customerEmail}</Typography>
				<Typography fontWeight='fontWeightBold' variant='body1'>{description}</Typography>
				<Typography variant='caption'>
					Issued: {formatUnixDate(issueDate)}
				</Typography>
				<Typography variant='body1' m={1}>{formatCurrency(amount)}</Typography>
			</div>
			<div  className={classes.cardRight}>
				<div className={classes.invoiceStatus}>
					<Chip label={status} className={classes[`chip${status}`]} />
				</div>
		
				<div>
					<Link className={classes.moreBtn} to={`/invoice/${invoiceId}`}><Button variant='contained' color='secondary'>More</Button></Link>
				</div>
			</div>
		</Paper>
	)
}

export default InvoiceCard
