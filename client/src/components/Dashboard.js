import React, { useContext } from 'react'
import { InvoicesContext } from '../contexts/invoices.context'
import {
	Container,
	CssBaseline,
	Paper,
	Typography,
    makeStyles,
    Fab
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
	card: {
		padding: '1rem 2rem',
		display: 'flex',
		justifyContent: 'space-between',
		alignContent: 'center',
        alignItems: 'center',
        marginBottom: '1rem',
        [theme.breakpoints.down('xs')]: {
            display: 'block'
        }
    },
    fab: {
        position: 'fixed',
        right: theme.spacing(2),
        bottom: theme.spacing(2)
    }
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
					? invoices.map(({ email, deliverables, amount, paid, _id }) => (
							<Paper className={classes.card} key={_id}>
								<div className={classes.cardContainer}>
									<Typography variant='body1'>
										{email}
									</Typography>
									<Typography variant='body1'>
										{deliverables}
									</Typography>
									<Typography variant='caption'>
										Issued: 20 Aug 2020
									</Typography>
								</div>
								<div>
									<Typography>${amount}</Typography>
									<Typography>
										{paid ? 'Paid' : 'Unpaid'}
									</Typography>
								</div>
							</Paper>
					  ))
					: 'nothing'}
			</Container>
            <Link  to='/new/invoice'>
                        <Fab className={classes.fab} aria-label='create-invoice' color='primary'>
                            <AddIcon />
                        </Fab>
            </Link>
		</Container>
	)
}

export default Dashboard
