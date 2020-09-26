import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, makeStyles, Button, Paper } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { orderBy } from 'lodash'
import formatUnixDate from '../utils/formatUnixDate'
import formatCurrency from '../utils/formatCurrency'

const useStyles = makeStyles((theme) => ({
    tableContainer: {
        boxShadow: theme.boxShadow.lg,
    },
    tableHead: {
        background: theme.palette.secondary.main
    },
    tableHeadCell: {
        color: '#FFFFFF',
        '&:hover': {
           cursor: 'pointer' 
        }
    },
    moreBtn: {
		textDecoration: 'none'
	},
	chipvoid: {
		background: theme.palette.invoiceStatus.void,
		color: '#FFFFFF',
		[theme.breakpoints.down('xs')]: {
			margin: '0px'
		}
	},
	chipopen: {
		background: theme.palette.invoiceStatus.open,
		color: '#FFFFFF'
	},
	chippaid: {
		background: theme.palette.invoiceStatus.paid,
		color: '#FFFFFF'
	},
	chipoverdue: {
		background: theme.palette.invoiceStatus.overdue,
		color: '#FFFFFF'
    },	
    invoiceStatus: {
		margin: 'auto',
		padding: '0 12px',
		flexDirection: 'row',
		[theme.breakpoints.down('xs')]: {
			margin: '0.5rem 0rem',
			padding: '0rem'
		}
	},
}))

const tableHeaders = ['Emailed To', 'Issue Date', 'Due Date', 'Amount', 'Status', '']

const InvoiceTable = ({ invoices }) => {

    const classes = useStyles()
    const [sortColumn, setSortColumn] = useState('')
    const [sortDirection, setSortDirection] = useState('desc')

    const invertDirection = {
        asc: 'desc',
        desc: 'asc'
    }

    const handleSortColumn = (col) => {
        setSortColumn(col)
        setSortDirection(col === sortColumn ? invertDirection[sortColumn] : 'asc')

    }

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        {tableHeaders.map((col) => <TableCell className={classes.tableHeadCell} onClick={() => handleSortColumn(col)}>{col}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map(({customerEmail, issueDate, payableBy, amount, status, invoiceId }) => {
                        return (
                        <TableRow hover>
                            <TableCell>{customerEmail}</TableCell>
                            <TableCell>{formatUnixDate(issueDate)}</TableCell>
                            <TableCell>{formatUnixDate(payableBy)}</TableCell>
                            <TableCell>{formatCurrency(amount)}</TableCell>
                            <TableCell><Chip label={status} className={classes[`chip${status}`]} /></TableCell>
                            <TableCell><Link className={classes.moreBtn} to={`/invoice/${invoiceId}`}><Button variant='contained' color='secondary'>More</Button></Link></TableCell>
                        </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default InvoiceTable