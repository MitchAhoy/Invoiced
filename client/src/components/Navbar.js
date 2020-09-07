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
	Link
} from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { CreditCard, AccountCircle } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: '1rem',
		background: '#fff',
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	logo: {
		marginRight: theme.spacing(2),
		textDecoration: 'none',
		underline: 'none'
	},
	accountIcon: {
		color: '#000',
	},
	verificationAlert: {
		textAlign: 'center',
		alignItems: 'center'
	},
	verifyButton: {
		background: '#FFA129', 
		color: '#fff',
		marginRight: theme.spacing(5),
		marginTop: theme.spacing(1),
		padding: '0.5rem 1rem',
		borderRadius: '5px',
		textAlign: 'right',
		marginLeft: theme.spacing(2),
		display: 'inline-block',
		[theme.breakpoints.down('xs')]: {
			display: 'block',
			textAlign: 'center',
			maxWidth: '25%',
			margin: '0.5rem auto'
		}
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
				onClick={menuVisible ? handleMenuVisible : undefined}
				position='sticky'
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
					<NavLink to='/dashboard' className={classes.logo}>
						<Button varient='contained' className={classes.logo} edge='start' >
							<CreditCard className={classes.logo} />
							<Typography variant='h5'>Invoiced</Typography>
						</Button>
					</NavLink>
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
