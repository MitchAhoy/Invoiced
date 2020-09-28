import React, { useContext, useReducer } from 'react'
import { UserContext } from '../../contexts/user.context'
import { Paper, makeStyles, CssBaseline } from '@material-ui/core'
import { formFields, formInitalState, formReducer } from './formData'
import FormInput from './FormInput'
import FormReview from './FormReview'

const useStyles = makeStyles((theme) => ({
	formContainer: {
		padding: '2rem 2rem',
		maxWidth: '700px',
		margin: '2rem auto',
		boxShadow: theme.boxShadow.xxl
	},
}))

const Form = ({
	history,
	match: {
		params: { formFor },
	},
}) => {

	const [{isReviewing, inputDetails}, formDispatch] = useReducer(formReducer, formInitalState)

	const classes = useStyles()
	const formInfo = formFields[formFor]
	const { customers, getUserData } = useContext(UserContext)

	const handleTypedChange = (evt) => formDispatch({type: 'UPDATE_TYPED_INPUTS', update: inputDetails , value: evt.target.value, key: evt.target.name})
	const handleFormReview = (evt) => formDispatch({type: 'SET_IS_REVIEWING'})
	const handleFormSubmit = (evt) => {formDispatch({type: 'SUBMIT_FORM', evt, formInfo, history}); getUserData()}
	const handleDateChanged = (date) => formDispatch({type: 'UPDATE_DATE', date})

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
						customers={customers}
					/>
				) : (
					<FormInput
						formData={{
							inputDetails,
							handleTypedChange,
							handleFormReview,
							handleDateChanged,
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
