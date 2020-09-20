import axios from 'axios'

export const formFields = {
    invoice: {
        title: 'Create A New Invoice 🧾',
        fields: [
            {label: 'Customer', inputFor: 'customer', type: 'select', value: ''},
            {label: 'Amount', inputFor: 'amount', type: 'currency', value: 0},
            {label: 'Due Date', inputFor: 'payableBy', type: 'selectDate', value: ''},
        ],
        submit: async (state) => {
            try {
                const response = await axios.post('/api/new_invoice', state)
                return response
            } catch (err) {
                throw new Error(err)
            }
        }
    
    },
    customer: {
        title: 'Create A New Customer 🕺',
        fields: [
            {label: 'Customer Name', inputFor: 'customerName', type: 'text', value: ''},
            {label: 'Customer Email', inputFor: 'customerEmail', type: 'email', value: ''},
            {label: 'Billing Address', inputFor: 'customerAddress', type: 'text', value: ''},
        ],
        submit: async (state) => {
            try {
                const response = await axios.post('/stripe/create_customer', state)
                return response
            } catch (err) {
                throw new Error(err)
            }
        },
    }
}

export const formInitalState = {
    isReviewing: false,
    inputDetails: {}
}

export const formReducer = (state, action) => {
    switch (action.type) {
        case 'SET_IS_REVIEWING': 
            return {
                ...state,
                isReviewing: !state.isReviewing
            }
        case 'SUBMIT_FORM':
            action.evt.preventDefault()
            
            action.formInfo.submit(state.inputDetails)
            action.history.push('/dashboard')
            return {
                ...state
            }
        case 'UPDATE_TYPED_INPUTS':
            return {
                ...state,
                inputDetails: {
                    ...state.inputDetails,
                    [action.key]: action.value
                }
            }
            case 'UPDATE_DATE':
                return {
                    ...state,
                    inputDetails: {
                        ...state.inputDetails,
                        payableBy: action.date
                    }
                }
            }
        
    }
