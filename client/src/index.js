import React, { useContext } from 'react';
import { UserProvider } from './contexts/user.context'
import theme from './theme'
import { ThemeProvider } from '@material-ui/styles'
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


