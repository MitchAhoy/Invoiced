import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#007fed',
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