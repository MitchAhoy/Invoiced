import React, { createContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export const NewInvoiceContext = createContext()

export const NewInvoiceProvider = ({ children }) => {
    const history = useHistory()

    const [formDetails, setFormDetails] = useState({})
    const handleFormChange = (evt) => setFormDetails({ ...formDetails, [evt.target.name]: evt.target.value })
    
    const [showReview, setShowReview] = useState(false)
	const handleShowReview = (evt) => {
		evt.preventDefault()
		setShowReview(!showReview)
    }
    
    const sendInvoice = async () => {
        try {
            const response = await axios.post('/api/new_invoice', formDetails)
            history.push('/dashboard')
        } catch (err) {
			throw new Error(err)
        }
    }

    return (
		<NewInvoiceContext.Provider value={{formDetails, handleFormChange, showReview, handleShowReview, sendInvoice}}>
			{children}
		</NewInvoiceContext.Provider>
	)
}