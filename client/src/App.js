import React from 'react'
import { makeStyles, Container } from '@material-ui/core'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Home from './components/Home'
import VerificationSuccess from './components/VerificationSuccess'
import { Route, Switch } from 'react-router-dom'
import InvoiceDetailedCard from './components/InvoiceDetailedCard'
import Form from './components/form/Form'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar,
  appContainer: {
	  height: '100vh'
  }
}))

const App = () => {

  const classes = useStyles()

	return (
		<div className={classes.appContainer}>
			<nav>
				<Navbar />
			</nav>
			<main className={classes.appBarSpacer}>
				<Container>

					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/verification-success' component={VerificationSuccess} />
						<Route exact path='/dashboard' component={Dashboard} />
						<Route exact path='/create/:formFor' component={Form} />
						<Route path='/invoice/:invoiceId' component={InvoiceDetailedCard} />
					</Switch>

				</Container>
			</main>
		</div>
	)
}

export default App