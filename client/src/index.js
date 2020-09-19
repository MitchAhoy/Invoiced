import React from 'react'
import { UserProvider } from './contexts/user.context'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<UserProvider>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<App />
					</MuiPickersUtilsProvider>
				</UserProvider>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
)
