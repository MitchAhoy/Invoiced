import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, makeStyles, Button, Paper, Toolbar, Select, IconButton, MenuItem, FormControl, InputLabel, TextField } from '@material-ui/core'
import { Clear as ClearIcon } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import formatUnixDate from '../utils/formatUnixDate'
import formatCurrency from '../utils/formatCurrency'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '2rem'
    },
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
    filterStatus: {
        width: '10rem'
    },
    filterBar: {
        justifyContent: 'space-between',
        marginBottom: '1rem'
    }
}))

const tableHeaders = ['Emailed To', 'Issue Date', 'Due Date', 'Amount', 'Status', '']
const filterOptions = ['open', 'paid', 'void']

const InvoiceTable = ({ invoices }) => {
    const classes = useStyles()
    const [isFiltering, setIsFiltering] = useState(false)
    const [filter, setFilter] = useState({})
    const [listToRender, setListToRender] = useState(invoices)

    const handleStatusFilter = (evt) => { setIsFiltering(true); setFilter({ ...filter, status: evt.target.value }) }
    const handleSearchFilter = (evt) => { setIsFiltering(true); setFilter({ ...filter, customerEmail: evt.target.value }); console.log(evt.target) }

    const updateFilter = () => {
        const filterValues = Object.values(filter)

        filterValues.forEach((arg) => {
            if (arg === '' || arg === ' ' || arg === undefined) return true
        })

        const filteredInvoices = invoices.filter(invoice => {
            let validInvoice = true

            for (const [key, value] of Object.entries(filter)) {
                if (Array.isArray(value)) {
                    if (!value.toLowerCase().includes(invoice[key]).toLowerCase()) {
                        validInvoice = false
                    }
                }
                else if (typeof value === 'function') {
                    if (!value(invoice[key])) {
                        validInvoice = false
                    }
                }
                else if (invoice[key].toLowerCase().includes(filter[key].toLowerCase())) validInvoice = true
                else {
                    if (value !== invoice[key]) validInvoice = false
                }
            }

            return validInvoice
        })

        setListToRender(filteredInvoices)
    }

    useEffect(() => {
        if (isFiltering) {
            updateFilter()
        }

    }, [filter])

    const clearFilter = () => {
        setFilter({})
        setIsFiltering(false)
        setListToRender(invoices)
    }

    return (
        <div className={classes.root}>
            <Toolbar className={classes.filterBar}>
                <TextField
                    label='Search Emails'
                    name='filter-search'
                    type='text'
                    value={filter.customerEmail || ''}
                    variant='outlined'
                    onChange={handleSearchFilter}
                />
                <div>
                    <FormControl
                        variant='outlined'
                        className={classes.filterStatus}
                    >
                        <InputLabel id='filter-status'>Status</InputLabel>
                        <Select
                            labelId={'filter-status-label'}
                            id='filter-status'
                            label='filter-status'
                            onChange={handleStatusFilter}
                            name={filter.status || 'status'}
                            value={filter.status || ''}

                        >
                            {filterOptions.map((status) => <MenuItem key={status} value={status}>{status}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {isFiltering && (
                        <IconButton>
                            <ClearIcon onClick={clearFilter} />
                        </IconButton>
                    )}
                </div>
            </Toolbar>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table>
                    <TableHead className={classes.tableHead}>
                        <TableRow>
                            {tableHeaders.map((col) => <TableCell key={col} className={classes.tableHeadCell}>{col}</TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {listToRender.map(({ customerEmail, issueDate, payableBy, amount, status, invoiceId }) => {
                            return (
                                <TableRow hover key={invoiceId}>
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