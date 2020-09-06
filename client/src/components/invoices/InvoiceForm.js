import React, { useContext } from 'react'
import { NewInvoiceContext } from '../../contexts/newInvoice.context'
import {
	Typography,
	Paper,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
} from '@material-ui/core'

import formFields from './formFields'

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

const InvoiceForm = () => {
    const classes = useStyles()
    const {formDetails, handleFormChange, handleShowReview} = useContext(NewInvoiceContext)

	const newInvoiceFields = formFields.map(({ label, name, type }) => (
		<TextField
            key={name}
            label={label}
            name={name}
			htmlFor={name}
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
						<Button
							variant='contained'
							color='secondary'
							type='submit'
						>
							Cancel
						</Button>
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
