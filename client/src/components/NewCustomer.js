import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {
	Typography,
	Paper,
	TextField,
	makeStyles,
	Button,
	CssBaseline,
	Container
} from '@material-ui/core'

const NewCustomer = () => {
	return (
		<Container>
			<CssBaseline />
			<Typography variant='h4'>Create A New Customer 🧍</Typography>

            <form>
                <TextField />
            </form>
		</Container>
	)
}

export default NewCustomer
