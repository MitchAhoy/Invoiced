import React, {useState} from 'react'
import {
	Paper,
	makeStyles,
	CssBaseline,
} from '@material-ui/core'
import formFields from './formFields'
import FormInput from './FormInput'

const useStyles = makeStyles((theme) => ({
	formContainer: {
		padding: '1rem 2rem',
		maxWidth: '700px',
	},
}))

const Form = ({match: {params: {formFor}}}) => {
    const classes = useStyles()
    const formInfo = formFields[formFor]
    const [isReviewing, setIsReviewing] = useState(false)
    console.log(formInfo)


	return (
		<div>
			<CssBaseline />
			<Paper elevation={0} className={classes.formContainer}>
				<FormInput formInfo={formInfo}/>
			</Paper>
		</div>
	)
}

export default Form
