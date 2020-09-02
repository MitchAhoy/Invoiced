import React from 'react'
import {Typography, Paper, TextField, makeStyles} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: '1rem'
    },
    formContainer: {
        padding: '1rem 2rem',
        width: '75%'
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    formInput: {
       maxWidth: '75%' 
    }
}))


const NewInvoice = () => {

    const classes = useStyles()


    return(
        <div>
            <Typography variant='h4' className={classes.title}>
                Create A New Invoice 🧾
            </Typography>
            <Paper elevation={0} className={classes.formContainer}>
                <form className={classes.form}>
                    <TextField label='Recipient First Name' name='First Name' className={classes.formInput}/>
                    <TextField label='Recipient Last Name' name='Last Name'/>
                    <TextField label='' name='to'/>
                </form>
            </Paper>
        </div>
    )
}

export default NewInvoice
