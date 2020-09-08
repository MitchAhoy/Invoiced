import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({})

	useEffect(() => {
		const getUser = async () => {
			try {
				const userProfile = await axios.get('/api/current_user')
				if (userProfile) setUser(userProfile.data)
			} catch (err) {
				throw new Error(err)
			}
		}
		getUser()
	}, [])

	useEffect(() => {
        if (user.verification) return
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
		<UserContext.Provider value={{ user }}>
			{children}
		</UserContext.Provider>
	)
}
