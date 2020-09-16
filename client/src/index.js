import React, { useContext } from 'react';
import { UserProvider } from './contexts/user.context'
import { NewInvoiceProvider } from './contexts/newInvoice.context'
import { InvoicesProvider } from './contexts/invoices.context'
import { CustomerProvider } from './contexts/customers.context'
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
          <NewInvoiceProvider>
            <InvoicesProvider>
              <CustomerProvider>
                <App />
              </CustomerProvider>
            </InvoicesProvider>
          </NewInvoiceProvider>
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


