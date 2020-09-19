import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/user.context'
import {
	AppBar,
	Toolbar,
	makeStyles,
	IconButton,
	Button,
	Popover,
	Typography,
	CssBaseline,
	Link,
	Avatar
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
	popoverText: {
		padding: theme.spacing(2)
	}
}))



const Navbar = () => {
	
	const { user: {verification, _id, verified, profileImage, firstName} } = useContext(UserContext)

	const classes = useStyles()

	const [anchorEl, setAnchorEl] = useState(null)

	const handleMenuClick = (evt) => setAnchorEl(evt.currentTarget)
	const handleMenuClose = () => setAnchorEl(null)

	return (
		<>
			<AppBar
				className={classes.root}
				onClick={anchorEl ? handleMenuClose : undefined}
				position='sticky'
			>
				<CssBaseline />
				{_id && !verified && (
						
						<Alert severity='warning' className={classes.verificationAlert}>
							
							In order to recieve funds you will first need to verify
							your identity.

							<Link className={classes.verifyButton} href={verification.verificationURL} underline='none'>Verify Now</Link>
							
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
								onClick={handleMenuClick}
							>
								<Avatar
									className={classes.accountIcon}
									alt={firstName}
									src={profileImage}
								/>
							</IconButton>
							<Popover
								id='account-menu'
								PopoverClasses={{ disableScrollLock: true }}
								open={Boolean(anchorEl)}
								anchorEl={anchorEl}
								onClose={handleMenuClose}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
							>
								<Typography onClick={handleMenuClose} className={classes.popoverText}>
									Settings
								</Typography>
								<Typography onClick={handleMenuClose} className={classes.popoverText}>
									<Link
										underline='none'
										href='/api/logout'
										color='inherit'
									>
										Sign Out
									</Link>
								</Typography>
							</Popover>
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
