// import React, { createContext, useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
// import axios from 'axios'

// export const CustomersContext = createContext()

// export const CustomerProvider = ({ children }) => {

//     const [customers, setCustomers] = useState({})
    


//     useEffect(() => {
//         const getCustomers = async () => {
//             try {
//                 const customers = 
//                 setCustomers(customers.data)
//                 console.log(customers)
//             } catch (err) {
//                 throw new Error(err)
//             }
//         }
    
//         getCustomers()
//     }, [])
    



//     return (
// 		<CustomersContext.Provider value={{customers}}>
// 			{children}
// 		</CustomersContext.Provider>
// 	)
// }