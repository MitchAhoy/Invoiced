import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const [invoices, setInvoices] = useState({})
	const [customers, setCustomers] = useState({})

	useEffect(() => {
		const getUserData = async () => {
			try {
				const userProfile = await axios.get('/api/current_user')
				if (userProfile) setUser(userProfile.data)
				const userInvoices = await axios.get('/api/invoices')
				if (userInvoices) setInvoices(userInvoices.data)
				const userCustomers = await axios.get('/api/customers')
				if (userCustomers) setCustomers(userCustomers.data) 
			} catch (err) {
				throw new Error(err)
			}
		}
		getUserData()
	}, [])

	useEffect(() => {
        if (user.verified) return
		const getOnboardingLink = async () => {
			try {
				const onboardingLink = await axios.post(
					'/stripe/create_account_hosted'
				)
			} catch (err) {
				throw new Error(err)
			}
		}
		getOnboardingLink()
	}, [user])

	return (
		<UserContext.Provider value={{ user, invoices, customers }}>
			{children}
		</UserContext.Provider>
	)
}
