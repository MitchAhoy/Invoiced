import React from 'react'
import {makeStyles, Typography} from '@material-ui/core'
import formatCurrency from '../utils/formatCurrency'

const useStyles = makeStyles((theme) => ({
    amountCard: {
        margin: '0.5rem 1rem'
    },
    paid: {
        color: theme.palette.invoiceStatus.paid
    },
    open: {
        color: theme.palette.invoiceStatus.unpaid
    }
}))

const AmountDashboardCard = ({valueToSum, invoices, label}) => {

    const classes = useStyles()

    const reducer = (acc, val) => val.status === valueToSum ? acc + val.amount : acc

    const cardValue = invoices.reduce(reducer, 0)


    return (
            <div className={classes.amountCard}>
                <Typography variant='caption' className={classes[valueToSum]}>{label}</Typography>
                <Typography variant='h4' className={classes[valueToSum]}>{formatCurrency(cardValue)}</Typography>
            </div>
    )
}

export default AmountDashboardCard