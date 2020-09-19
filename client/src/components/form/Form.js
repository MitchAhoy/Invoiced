import React, { useContext, useState } from 'react'
import {UserContext} from '../../contexts/user.context'
import { Paper, makeStyles, CssBaseline } from '@material-ui/core'
import formFields from './formFields'
import FormInput from './FormInput'
import FormReview from './FormReview'

const useStyles = makeStyles((theme) => ({
	formContainer: {
		padding: '2rem 2rem',
		maxWidth: '700px',
		margin: '2rem auto',
	},
}))

const Form = ({
	history,
	match: {
		params: { formFor },
	},
}) => {
	const classes = useStyles()
	const formInfo = formFields[formFor]
	console.log(formInfo)
	const { customers } = useContext(UserContext)
	const [isReviewing, setIsReviewing] = useState(false)
	const [inputDetails, setInputDetails] = useState({})
	const handleFormChange = (evt) =>
		setInputDetails({
			...inputDetails,
			[evt.target.name]: evt.target.value,
		})
	const handleFormReview = () => setIsReviewing(!isReviewing)
	const handleFormSubmit = (evt) => {
		console.log(inputDetails)
		evt.preventDefault()
		formInfo.submit(inputDetails)
		history.push('/dashboard')
	}


	return (
		<div>
			<CssBaseline />
			<Paper elevation={1} className={classes.formContainer}>
				{isReviewing ? (
					<FormReview
						formInfo={formInfo}
						formData={{
							inputDetails,
							handleFormReview,
							handleFormSubmit,
						}}
					/>
				) : (
					<FormInput
						formData={{
							inputDetails,
							handleFormChange,
							handleFormReview,
							formInfo,
							customers,
							history
						}}
					/>
				)}
			</Paper>
		</div>
	)
}

export default Form
