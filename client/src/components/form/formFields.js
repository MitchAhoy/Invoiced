import axios from 'axios'

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
        type: 'createInvoice',
        submit: async (state) => {
            try {
                const response = await axios.post('/api/new_invoice', state)
            } catch (err) {
                throw new Error(err)
            }
        }
    
    },
    customer: {
        title: 'Create A New Customer 🕺',
        fields: [
            {label: 'Customer Name', name: 'customerName', type: 'text'},
            {label: 'Customer Email', name: 'customerEmail', type: 'email'},
            {label: 'Billing Address', name: 'customerAddress', type: 'text'},
        ],
        type: 'createCustomer',
        submit: async (state) => {
            try {
                const response = await axios.post('/stripe/create_customer', state)
                console.log(response)
            } catch (err) {
                console.log(err)
                throw new Error(err)
            }
        }
    }
}