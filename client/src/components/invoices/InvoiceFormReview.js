import React, {useContext} from 'react'
import { NewInvoiceContext } from '../../contexts/newInvoice.context'
import {invoiceFormFields} from '../formFields'
import {Typography, makeStyles, Button, CssBaseline} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: '1rem'
    },
    reviewElement: {
        marginTop: '1rem'
    },
    formButtons: {
		display: 'flex',
		marginTop: '2rem',
		justifyContent: 'space-between',
	}

}))

const InvoiceFormReview = () => {

    const classes = useStyles()
    const {formDetails, handleShowReview, sendInvoice} = useContext(NewInvoiceContext)

    const reviewFields = invoiceFormFields.map(({label, name}) => (
        <div>
            <Typography variant='caption'>{label}</Typography>
            <Typography variant='body1'>{formDetails[name]}</Typography>
        </div>
    ))
   
    return(
        <div>
            <CssBaseline />
            <Typography variant='h4' className={classes.title}>
                Invoice Review 👓
            </Typography>
            {reviewFields}
            <div className={classes.formButtons}>
						<Button
							variant='contained'
							color='secondary'
                            type='submit'
                            onClick={handleShowReview}
						>
							Edit
						</Button>
						<Button
							variant='contained'
							color='primary'
                            type='submit'
                            onClick={sendInvoice}
						>
							Send Invoice
						</Button>
					</div>
        </div>
    )
}

export default InvoiceFormReview
