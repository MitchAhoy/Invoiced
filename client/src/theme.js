import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4DC1F9',
            light: {
                main: '#EEEEFF',
                white: '#FFFFFF'
            }
        },
        secondary: {
            main: '#7b68ee'
        }
    }
})

export default theme