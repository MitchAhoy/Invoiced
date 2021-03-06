const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-AU', {style: 'currency', currency: 'AUD'}).format(amount / 100)
}

export default formatCurrency