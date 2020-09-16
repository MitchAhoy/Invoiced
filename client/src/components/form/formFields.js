export default {
    invoice: {
        title: 'Create A New Invoice 🧾',
        fields: [
            {label: 'First Name', name: 'firstName', type: 'text'},
            {label: 'Last Name', name: 'lastName', type: 'text'},
            {label: 'Deliverables', name: 'deliverables', type: 'text'},
            {label: 'Email', name: 'email', type: 'email'},
            {label: 'Amount', name: 'amount', type: 'number'}
        ],
        type: 'createInvoice'
    
    },
    customer: {
        title: 'Create A New Customer',
        fields: [
            {label: 'Customer Name', name: 'customerName', type: 'text'},
            {label: 'Customer Email', name: 'customerEmail', type: 'email'},
            {label: 'Billing Address', name: 'customerAddress', type: 'text'},
        ],
        type: 'createCustomer'
    }
}