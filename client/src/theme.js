import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4FABFF',
            light: {
                main: '#EEEEFF',
                white: '#FFFFFF'
            }
        },
        secondary: {
            main: '#3C344B'
        }
    }
})

export default theme