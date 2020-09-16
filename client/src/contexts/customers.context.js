import React, { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const CustomersContext = createContext()

export const CustomerProvider = ({ children }) => {
    const history = useHistory()

    const [formDetails, setFormDetails] = useState({})
    const handleFormChange = (evt) => setFormDetails({ ...formDetails, [evt.target.name]: evt.target.value })
    
    const [showReview, setShowReview] = useState(false)
	const handleShowReview = (evt) => {
		evt.preventDefault()
		setShowReview(!showReview)
    }
    
    const createCustomer = async () => {
        try {
            const response = await axios.post('/stripe/create_customer', formDetails)
            history.push('/dashboard')
        } catch (err) {
			throw new Error(err)
        }
    }

    return (
		<CustomersContext.Provider value={{formDetails, handleFormChange, showReview, handleShowReview, createCustomer}}>
			{children}
		</CustomersContext.Provider>
	)
}