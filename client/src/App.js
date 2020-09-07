import React, { useEffect, useContext } from 'react'
import { makeStyles, Container } from '@material-ui/core'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import NewInvoice from './components/invoices/NewInvoice'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

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
						<Route exact path='/dashboard' component={Dashboard} />
						<Route exact path='/new/invoice' component={NewInvoice} />
					</Switch>

				</Container>
			</div>
		</div>
	)
}

export default App
