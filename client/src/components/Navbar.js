import React, { useContext } from 'react';
import { UserContext } from '../contexts/user.context'
import {AppBar, Toolbar, makeStyles, IconButton, Typography, Button, CardMedia} from '@material-ui/core'
import CreditCardIcon from '@material-ui/icons/CreditCard'


const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute'
    },
    logo: {
        color: '#fff'
    }
}))

const Navbar = () => {
    const { firstName } = useContext(UserContext)
    const classes = useStyles()

    return(
            <AppBar className={classes.root}>
                <Toolbar>
                <Button contained className={classes.logo}>
                    <CreditCardIcon /> 
                    <Typography variant='h5'>Invoiced</Typography>
                </Button>
                </Toolbar>
            </AppBar>
    )
}

export default Navbar