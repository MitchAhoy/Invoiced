import React from 'react'
import {
	Typography,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
} from '@material-ui/core'


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

const FormReview = ({formInfo: {fields, title}, formData: {inputDetails, handleFormReview, handleFormSubmit}}) => {
    const classes = useStyles()

    const renderFields = fields.map(({ label, inputFor, type }) => (
		<TextField
            key={inputFor}
            label={label}
            name={inputFor}
            className={classes.formInput}
            type={type}
			required
			value={inputDetails[inputFor]}
			variant='outlined'
			disabled
		/>
	))

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
