import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#7B68EE',
            light: {
                main: '#EEEEFF',
                white: '#FFFFFF'
            }
        },
        secondary: {
            main: '#3C344B'
        },
        invoiceStatus: {
            open: '#4BCCF9',
            paid: '#29B063',
            overdue: '#FD71AF',
            void: '#000000'
        }
    },
    boxShadow: {
       xxl: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
       xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
       lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    },
    typography: {
        fontFamily: [
            'Poppins', 
            'sans-serif'
        ]
    }
})

export default theme