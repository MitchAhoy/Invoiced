import React, { useContext } from 'react'
import { NewInvoiceContext } from '../../contexts/newInvoice.context'
import { Link } from 'react-router-dom'
import {
	Typography,
	Paper,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
} from '@material-ui/core'

import { invoiceFormFields } from './formFields'

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

const InvoiceForm = ({ history }) => {
    const classes = useStyles()
	const {formDetails, handleFormChange, handleShowReview} = useContext(NewInvoiceContext)

	const newInvoiceFields = invoiceFormFields.map(({ label, name, type }) => (
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
		<div>
			<CssBaseline />
			<Typography variant='h4' className={classes.title}>
				Create A New Invoice 🧾
			</Typography>
			
				<form className={classes.form} onSubmit={handleShowReview}>
					{newInvoiceFields}
					<div className={classes.formButtons}>
						<Link to={'/dashboard'} underline='none'>
							<Button
								variant='contained'
								color='secondary'
							>
								Cancel
							</Button>
						</Link>
						<Button
							variant='contained'
							color='primary'
							type='submit'
						>
							Review
						</Button>
					</div>
				</form>

		</div>
	)
}

export default InvoiceForm
