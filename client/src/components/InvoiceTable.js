import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, makeStyles, Button, Paper, Toolbar, Select, IconButton, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import { FilterList as FilterListIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
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
const filterOptions = ['open', 'paid', 'void']

const InvoiceTable = ({ invoices }) => {
    const classes = useStyles()
    const [filterStatus, setFilterStatus] = useState('')
    const [listToRender, setListToRender] = useState(invoices)

    useEffect(() => {
        if (filterStatus) {
            const filterInvoices = invoices.filter(i => i.status === filterStatus)
            setListToRender(filterInvoices)
        }

    }, [filterStatus])

    return (
        <div>
            <Toolbar>

                <FormControl
                    variant='outlined'
                >
                    <InputLabel id='filter-status'>Filter</InputLabel>
                    <Select
                        labelId={'filter-status-label'}
                        id='filter-status'
                        label='filter-status'
                        onChange={(evt) => setFilterStatus(evt.target.value)}
                        name='filter-status'

                    >
                        {filterOptions.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                    </Select>
                </FormControl>
            </Toolbar>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {tableHeaders.map((col) => <TableCell className={classes.tableHeadCell}>{col}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listToRender.map(({ customerEmail, issueDate, payableBy, amount, status, invoiceId }) => {
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
        </div>
    )
}

export default InvoiceTable