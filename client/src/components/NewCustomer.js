import React, { useContext } from 'react'
import { CustomersContext } from '../contexts/customers.context'
import { Link } from 'react-router-dom'
import {
	Typography,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
	Container,
} from '@material-ui/core'
import { newCustomerFormFields as formFields} from './formFields'

const useStyles = makeStyles((theme) => ({
	title: {
		marginBottom: '1rem',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	formInput: {
		marginTop: '1rem',
	},
	formButtons: {
		display: 'flex',
		marginTop: '2rem',
		justifyContent: 'space-between',
	},
}))

const NewCustomer = ({history}) => {
	const classes = useStyles()
	const { formDetails, handleFormChange, handleShowReview } = useContext(CustomersContext)


	const newCustomerFields = formFields.map(({ label, name, type }) => (
		<TextField
            key={name}
            label={label}
            name={name}
            className={classes.formInput}
            type={type}
			required
            onChange={handleFormChange}
            value={formDetails[name]}
		/>
	))

	return (
		<Container>
			<CssBaseline />
			<Typography variant='h4'>
				Create A New Customer 🧍
			</Typography>

			<form onSubmit={handleShowReview} className={classes.form}>
				{newCustomerFields}
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
