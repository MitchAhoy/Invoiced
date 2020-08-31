// import React, { createContext, useState, useEffect, useContext } from 'react'
// import axios  from 'axios'
// import UserContext from './user.context'

// const { verified } = useContext(UserContext)

// export const StripeRegistrationContext = createContext()

// export const StripeRegistrationProvider = ({ children }) => {
//     const [onboardingLink, setOnboardingLink] = useState('')

//     useEffect(() => {
//         if (verified) return
//         const getOnboardingLink = async () => {
//             try {
//                 const link = await axios.post('/stripe/create_account_hosted')
//                 if (link) setOnboardingLink(link.data)
//             } catch (err) {
//                 throw new Error(err)
//             }
//         }
//         getOnboardingLink()
//         console.log(onboardingLink)
//     }, [])

//     return(
//         <StripeRegistrationContext.Provider value={onboardingLink}>
//             {children}
//         </StripeRegistrationContext.Provider>
//     )
// }