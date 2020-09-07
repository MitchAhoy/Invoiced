import React, { useReducer, createContext, useContext, useEffect } from 'react'
import axios from 'axios'

export const InvoicesContext = createContext()

export const InvoicesProvider = ({ children }) => {

    const fetchReducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return action.payload
            case 'FETCH_ERROR':
                return new Error('something went wrong...')
            default:
                return state
        }
    }
    
    const [invoices, dispatch] = useReducer(fetchReducer, {})
    
    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('/api/invoices')
                dispatch({type: 'FETCH_SUCCESS', payload: response.data})
            } catch (err) {
                throw new Error(err)
            }
        }
        fetchInvoices()
    }, [])

	return (
		<InvoicesContext.Provider value={{invoices}}>
            {children}
        </InvoicesContext.Provider>
	)
}
