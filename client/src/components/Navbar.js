import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/user.context'
import {
	AppBar,
	Toolbar,
	makeStyles,
	IconButton,
	Typography,
	Button,
	Menu,
	MenuItem,
	CssBaseline,
	Link,
	Container
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { CreditCard, AccountCircle } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'absolute',
		flexGrow: 1,
		margin: '0',
		background: '#fff',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	logo: {
		marginRight: theme.spacing(2),
	},
	accountIcon: {
		color: '#000',
	},
	verificationAlert: {
		textAlign: 'center',
	},
	verifyButton: {
		background: '#FFA129', 
		color: '#fff',
		marginRight: theme.spacing(5),
		padding: '0.5rem 1rem',
		borderRadius: '5px',
		textAlign: 'right',
		marginLeft: theme.spacing(2)
	},
}))

const Navbar = () => {
	const { _id, verified, onboardingLink } = useContext(UserContext)
	const classes = useStyles()

	const [menuVisible, setmenuVisible] = useState(false)
	const handleMenuVisible = () => setmenuVisible(!menuVisible)

	return (
		<>
			<AppBar
				className={classes.root}
				position='static'
				onClick={menuVisible ? handleMenuVisible : undefined}
			>
				<CssBaseline />
				{!verified && (
						
						<Alert severity='warning' className={classes.verificationAlert}>
							
							In order to recieve funds you will first need to verify
							your identity.

							<Link className={classes.verifyButton} href={onboardingLink} underline='none'>Verify Now</Link>
							
						</Alert>
				
					
				)}
				<Toolbar className={classes.toolbar}>
					<Button contained className={classes.logo} edge='start'>
						<CreditCard className={classes.logo} />
						<Typography variant='h5'>Invoiced</Typography>
					</Button>
					{_id ? (
						<>
							<IconButton
								aria-controls='simple-menu'
								aria-haspopup='true'
								onClick={handleMenuVisible}
							>
								<AccountCircle
									className={classes.accountIcon}
								/>
							</IconButton>
							<Menu
								id='account-menu'
								open={menuVisible}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
							>
								<MenuItem onClick={handleMenuVisible}>
									Settings
								</MenuItem>
								<MenuItem onClick={handleMenuVisible}>
									<Link
										underline='none'
										href='/api/logout'
										color='inherit'
									>
										Sign Out
									</Link>
								</MenuItem>
							</Menu>
						</>
					) : (
						<Button
							color='secondary'
							variant='contained'
							href='/auth/google'
						>
							Login
						</Button>
					)}
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Navbar
