import React from 'react'
import { makeStyles, Container } from '@material-ui/core'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import VerificationSuccess from './components/VerificationSuccess'
import { Route, Switch } from 'react-router-dom'
import InvoiceDetailedCard from './components/InvoiceDetailedCard'
import Form from './components/form/Form'

const useStyles = makeStyles((theme) => ({
  appBarSpacer: theme.mixins.toolbar
}))

const App = () => {

  const classes = useStyles()

	return (
		<div className='App'>
			<nav>
				<Navbar />
			</nav>
			<div className={classes.appBarSpacer}>
				<Container>

					<Switch>
						<Route exact path='/verification-success' component={VerificationSuccess} />
						<Route exact path='/dashboard' component={Dashboard} />
						<Route exact path='/create/:formFor' component={Form} />
						<Route path='/invoice/:id' component={InvoiceDetailedCard} />
					</Switch>

				</Container>
			</div>
		</div>
	)
}

export default App