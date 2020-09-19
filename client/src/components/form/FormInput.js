import React from 'react'
import { Link } from 'react-router-dom'
import {
	Typography,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
} from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'

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
	createCustomerBtn: {
		marginTop: '0.75rem',
	},
	createCustomerLink: {
		textDecoration: 'none'
	},
	noCustomers: {
		width: '100%',
	},
	datePicker: {
		width: '4rem',
	},
}))

const FormInput = ({
	formData: {
		handleFormChange,
		handleFormReview,
		inputDetails,
		formInfo: { fields, title },
		customers,
		history
	},
}) => {
	const classes = useStyles()

	const renderFields = fields.map(({ label, inputFor, type }) => {
		switch (type) {
			case 'number':
				return (
					<TextField
						key={inputFor}
						label={label}
						name={inputFor}
						className={classes.formInput}
						type={type}
						required
						onChange={handleFormChange}
						value={inputDetails[inputFor]}
						variant='outlined'
						autoComplete='off'
					/>
				)
			case 'text':
				return (
					<TextField
					key={inputFor}
					label={label}
					name={inputFor}
					className={classes.formInput}
					type={type}
					required
					onChange={handleFormChange}
					value={inputDetails[inputFor]}
					variant='outlined'
					autoComplete='off'
				/>
				)
			case 'select':
				return (
					<div className={classes.selectInput}>
						{customers.length > 0 ? (
							<FormControl
								variant='outlined'
								className={classes.formInput}
							>
								<InputLabel id={inputFor}>{label}</InputLabel>
								<Select
									labelId={`${inputFor}-label`}
									id={`${inputFor}-select`}
									label={label}
									onChange={handleFormChange}
								>
									{customers.map(({ name }) => (
										<MenuItem key={name} value={name}>
											{name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						) : (
							<TextField
								variant='outlined'
								disabled
								value='You must first create a customer'
								className={classes.noCustomers}
							></TextField>
						)}
						<Link to='/create/customer' className={classes.createCustomerLink}>
							<Button
								variant='contained'
								className={classes.createCustomerBtn}
							>
								Create a customer
							</Button>
						</Link>
					</div>
				)
			case 'selectDate':
				return (
					<KeyboardDatePicker
						className={classes.formInput}
						label='Payable by'
						placeholder='2018/10/10'
						format='yyyy/MM/dd'
						value={new Date()}
						inputVariant='outlined'
						onChange={date => console.log(date)}
					/>
				)
		}
	})

	return (
		<div>
			<CssBaseline />
			<Typography variant='h4' className={classes.title}>
				{title}
			</Typography>

			<form className={classes.form} onSubmit={handleFormReview}>
				{renderFields}
				<div className={classes.formButtons}>
						<Button variant='contained' color='secondary' onClick={() => history.goBack()}>
							Cancel
						</Button>
					<Button variant='contained' color='primary' type='submit'>
						Review
					</Button>
				</div>
			</form>
		</div>
	)
}

export default FormInput
