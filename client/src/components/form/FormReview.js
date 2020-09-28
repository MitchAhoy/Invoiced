import React from 'react'
import {
	Typography,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
	InputAdornment
} from '@material-ui/core'
import formatDate from '../../utils/formatDate'


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

const FormReview = ({formInfo: {fields, title}, formData: {inputDetails, handleFormReview, handleFormSubmit}, customers}) => {
	const classes = useStyles()
	const currentCustomer = customers.filter(customer => customer.stripeID === inputDetails.customer)[0]

    const renderFields = fields.map(({ label, inputFor, type }) => {
		let reviewText;
		switch (inputFor) {
			case 'payableBy':
				reviewText = formatDate(inputDetails[inputFor])
				break
			case 'customer':
				reviewText = `${currentCustomer.name} - ${currentCustomer.email}`
				break
			default:
				reviewText = inputDetails[inputFor]
		}
		
		return (<TextField
            key={inputFor}
            label={label}
            name={inputFor}
            className={classes.formInput}
            type={type}
			required
			value={reviewText}
			variant='outlined'
			disabled
			InputProps={type === 'currency' && { startAdornment: <InputAdornment variant='outlined' position="start">$</InputAdornment>, endAdornment: <InputAdornment variant='outlined' position="start">.00</InputAdornment>}}
		/>)
	})

	return (
		<div>
			<CssBaseline />
			<Typography variant='h4' className={classes.title}>
				{title}
			</Typography>
			
				<form className={classes.form} onSubmit={handleFormSubmit}>
				{renderFields}
					<div className={classes.formButtons}>
							<Button
								variant='contained'
                                color='secondary'
                                onClick={handleFormReview}
							>
								Edit
							</Button>
						<Button
							variant='contained'
							color='primary'
							type='submit'
						>
							Submit
						</Button>
					</div>
				</form>

		</div>
	)
}

export default FormReview
