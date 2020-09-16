import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
	Typography,
	Paper,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
	Container,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	formButtons: {
		display: 'flex',
		marginTop: '2rem',
		justifyContent: 'space-between',
	},
}))

const NewCustomer = () => {
	const classes = useStyles()

	return (
		<Container>
			<CssBaseline />
			<Typography variant='h4'>Create A New Customer 🧍</Typography>

			<form>
				<TextField />

				<div className={classes.formButtons}>
					<Link to={'/dashboard'} underline='none'>
						<Button variant='contained' color='secondary'>
							Cancel
						</Button>
					</Link>
					<Button variant='contained' color='primary' type='submit'>
						Review
					</Button>
				</div>
			</form>
		</Container>
	)
}

export default NewCustomer
