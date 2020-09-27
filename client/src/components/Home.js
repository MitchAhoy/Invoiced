import React from 'react'
import {ReactComponent as InvoiceHeroImg} from '../imgs/InvoiceHero.svg'
import dashboardImg from '../imgs/dashboardImg.png'
import detailedCardImg from '../imgs/detailedCardImg.png'
import stripeImg  from '../imgs/stripeImg.png'
import poweredByStripeImg  from '../imgs/poweredByStripeImg.png'
import {
	Container,
    Typography,
    Button,
	makeStyles,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    homeContainer: {
        marginTop: '5rem'
    },
    stripeBadge: {
        maxWidth: '200px',
        display: 'block',
        marginTop: '2rem'
    },
    headerSection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        }
    },
    headerDescription: {
        marginBottom: '1rem'
    },
    dashboardSection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '5rem',
        gap: '2rem',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
            textAlign: 'center'
        }
    },
    detailedCardSection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: '5rem',
        gap: '2rem',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            textAlign: 'center'
        }
    },
    stripeSection: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        margin: '5rem',
        gap: '2rem',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column-reverse',
            textAlign: 'center'
        }
    },
    getStartedSection: {
        margin: '5rem auto',
        textAlign: 'center'
    },
    invoiceHeroImg: {
        maxWidth: '20rem'
    },
    img: {
        width: '100%',
        height: 'auto',
        maxWidth: '50rem',
        boxShadow: theme.boxShadow.lg
    },
    stripeImg: {
        maxWidth: '100px'
    }
}))

const Home = () => {

    const classes = useStyles()

    return (
        <Container className={classes.homeContainer}>
        <section className={classes.headerSection}>
            <div className={classes.headerLeft}>
                <Typography variant='h3' gutterBottom>Send invoices fast and receive payments even faster.</Typography>
                <Typography variant='body1' gutterBottom className={classes.headerDescription}>The all-in-one platform for invoice management</Typography>
                <Button variant='contained' color='secondary'>Get started</Button>
                <img src={poweredByStripeImg} className={classes.stripeBadge}/>
            </div>
            <div>
                <InvoiceHeroImg className={classes.invoiceHeroImg} />
            </div>
        </section>

        <section className={classes.dashboardSection}>
        <img src={dashboardImg} className={classes.img}/>
        <div>
            <Typography variant='h4' gutterBottom>Intuative UI</Typography>
            <Typography variant='body1'>An easy to use dashboard to track your latest invoices and payments.</Typography>
        </div>
        </section>
        <section className={classes.detailedCardSection}>
            <div>
            <Typography variant='h4' gutterBottom>Full control</Typography>
            <Typography variant='body1'>Track and control individual invoices so you can spend less time on accounting and more time on your business.</Typography>
            </div>
            <img src={detailedCardImg} className={classes.img}/>
        </section>

        <section className={classes.stripeSection}>
            <img src={stripeImg} classname={classes.img}/>
            <div>
            <Typography variant='h4' gutterBottom>Stripe integration</Typography>
            <Typography variant='body1'>Our platform integrates directly with Stripe so you know your payments are secure.</Typography>
            </div>
        </section>

        <section className={classes.getStartedSection}>
            <Typography variant='h4' gutterBottom>Get started in just a few minutes</Typography>
            <Button variant='contained' color='secondary'>Get started</Button>
        </section>
        </Container>
    )
}

export default Home