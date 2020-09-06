import React, { useContext } from 'react'
import InvoiceForm from './InvoiceForm'
import InvoiceFormReview from './InvoiceFormReview'
import { NewInvoiceContext } from '../../contexts/newInvoice.context'
import {
	Paper,
	makeStyles,
	CssBaseline,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	formContainer: {
		padding: '1rem 2rem',
		maxWidth: '700px',
	},
}))

const NewInvoice = () => {
	const classes = useStyles()
    const { showReview } = useContext(NewInvoiceContext)

	return (
		<div>
			<CssBaseline />
			<Paper elevation={0} className={classes.formContainer}>
				{showReview ? <InvoiceFormReview /> : <InvoiceForm />}
			</Paper>
		</div>
	)
}

export default NewInvoice
