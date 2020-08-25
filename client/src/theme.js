import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#3C344B',
            light: {
                main: '#EEEEFF',
                white: '#FFFFFF'
            }
        },
        secondary: {
            main: '#62f1be'
        }
    }
})

export default theme