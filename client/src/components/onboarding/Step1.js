import React, { useEffect, useContext } from 'react';
import { CssBaseline, makeStyles, Container } from '@material-ui/core'
import {Elements, CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2)
    }
}))





const Step1 = () => {

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY)
const stripe = useStripe()
const elements = useElements()
    const classes = useStyles()

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        if (!stripe || !elements) {
          return
        }

    }
    

  return (
    <div className={classes.root}>
        <CssBaseline />
        
    <h2>Step 1</h2>

    <Elements stripe={stripePromise}>
        <CardElement />
    </Elements>
        

    </div>
  );
}

export default Step1

