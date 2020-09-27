import React from 'react'
import { Modal, Backdrop, Fade, makeStyles, Typography, IconButton } from '@material-ui/core'
import signInWithGoogle from '../imgs/signInWithGoogle.png'
import { Link } from 'react-router-dom'
import { Clear as ClearIcon } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        position: 'relative'
    },
    signInButton: {
        maxWidth: '15rem',
    },
    closeBtn: {
        position: 'absolute',
        right: '5px',
        top: '5px'
    },
}))

const SignInModal = ({ isModalOpen, setIsModalOpen }) => {

    const handleClose = () => setIsModalOpen(!isModalOpen)

    const classes = useStyles()

    return (
        <div>
            <Modal
                open={isModalOpen}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{ timeout: 500 }}
                className={classes.modal}
            >
                <Fade in={isModalOpen}>
                    <div className={classes.paper}>
                        <IconButton className={classes.closeBtn}>
                            <ClearIcon onClick={handleClose} />
                        </IconButton>
                        <div>
                            <Typography variant='h5' gutterBottom>Sign in to Invoiced</Typography>
                            <Typography variant='body1' gutterBottom>Login to access all of your invoices.</Typography>
                            <Link to={{ pathname: '/auth/google' }}>
                                <img src={signInWithGoogle} className={classes.signInButton} />
                            </Link>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default SignInModal