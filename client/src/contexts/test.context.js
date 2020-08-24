import React, { createContext, useState, useEffect } from 'react'
import axios  from 'axios'

export const TestTextContext = createContext()

export const TestTextProvider = ({ children }) => {
    
    const [testText, setTestText] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
            const data = await axios.get('/test')
            setTestText(data.data.test)
            } catch (err) {
                throw new Error(err)
            }
        }
        fetchData()
    }, [])
    
    const changeTestText = (evt) => setTestText('test text has been changed')

    return(
        <TestTextContext.Provider value={{testText, changeTestText}}>
            {children}
        </TestTextContext.Provider>

    )
}