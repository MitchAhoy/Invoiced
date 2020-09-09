import React from 'react'
import queryString from 'query-string'
import axios from 'axios'

const VerificationSuccess = ({location: {search}}) => {

    const {acct} = queryString.parse(search)


    const verifyAccount = async () => {
        try {
            // const response = await axios.post('/stripe/stripe_verification')
            const response = await axios({url:'/stripe/stripe_verification' , method:'post'})
            
            console.log(response)
        } catch (err) {
			console.log(err)
        }
    }

    verifyAccount()

    return (
        <div>
            <h2>
                Thanks - your account is now verified.
            </h2>

        </div>
    )
}

export default VerificationSuccess