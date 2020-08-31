import React, { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const [onboardingLink, setOnboardingLink] = useState('')

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
        if (user.verified) return
		const getOnboardingLink = async () => {
			try {
				const onboardingLink = await axios.post(
					'/stripe/create_account_hosted'
				)
				setOnboardingLink(onboardingLink.data)
				console.log(onboardingLink.data)
			} catch (err) {
				throw new Error(err)
			}
		}
		getOnboardingLink()
	}, [user])

	return (
		<UserContext.Provider value={{ ...user, onboardingLink }}>
			{children}
		</UserContext.Provider>
	)
}
