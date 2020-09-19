import axios from 'axios'

export default {
    invoice: {
        title: 'Create A New Invoice 🧾',
        fields: [
            {label: 'Customer', inputFor: 'customer', type: 'select'},
            {label: 'Amount', inputFor: 'amount', type: 'number'},
            {label: 'Due Date', inputFor: 'dueDate', type: 'selectDate'},
        ],
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
            {label: 'Customer Name', inputFor: 'customerName', type: 'text'},
            {label: 'Customer Email', inputFor: 'customerEmail', type: 'email'},
            {label: 'Billing Address', inputFor: 'customerAddress', type: 'text'},
        ],
        submit: async (state) => {
            try {
                const response = await axios.post('/stripe/create_customer', state)
            } catch (err) {
                throw new Error(err)
            }
        },
    }
}