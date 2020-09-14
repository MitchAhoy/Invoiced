import React from 'react'
import {
	CssBaseline,
	Paper,
	Typography,
	makeStyles,
	IconButton,
	Chip
} from '@material-ui/core'
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons'
import Moment from 'moment'

const useStyles = makeStyles((theme) => ({
	card: {
		padding: '1rem 2rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignContent: 'center',
		alignItems: 'center',
		marginBottom: '1rem',
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
		padding: '0 12px'
	}
}))

const InvoiceCard = ({ email, deliverables, issuedDate, amount, paid }) => {
	const classes = useStyles()

	return (
		<Paper className={classes.card}>
			<CssBaseline />
			<div className={classes.cardContainer}>
				<Typography variant='body1'>{email}</Typography>
				<Typography fontWeight='fontWightBold' variant='body1'>{deliverables}</Typography>
				<Typography variant='caption'>
					{Moment(issuedDate).format('ll')}
				</Typography>
			</div>
			<div  className={classes.cardRight}>
				<div className={classes.invoiceAmount} style={{flexDirection: 'row'}}>
					<Chip label={paid ? `$${amount} Paid` : `$${amount} Unpaid`} color={paid ? 'primary' : 'secondary'}/>
				</div>
				<div>
					<IconButton>
						<EditIcon />
					</IconButton>
					<IconButton>
						<DeleteIcon />
					</IconButton>
				</div>
			</div>
		</Paper>
	)
}

export default InvoiceCard
