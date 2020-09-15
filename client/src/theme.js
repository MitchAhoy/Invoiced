import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00FF9E',
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