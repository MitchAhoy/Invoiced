const mongoose = require('mongoose')
const Invoice = mongoose.model('invoice')
const Customer = mongoose.model('customer')
const { stripeSecretKey } = require('../config/keys')
const Stripe = require('stripe')
const stripe = Stripe(stripeSecretKey)

module.exports = (app) => {
	// Save invoice to database
	app.post('/api/new_invoice', async (req, res) => {
		try {
			const { customer, deliverables, amount, payableBy } = req.body

			const product = await stripe.products.create({
				name: deliverables,
			})

			const price = await stripe.prices.create({
				unit_amount: amount,
				currency: 'aud',
				product: product.id,
			})

			const invoiceItem = await stripe.invoiceItems.create({
				customer,
				price: price.id,
			})

			const stripeInvoice = await stripe.invoices.create(
				{
                    customer,
                    transfer_data: {
                        destination: req.user.stripeAcct
                    }
					
                }
			)

			const invoice = await new Invoice({
				customer,
				deliverables,
				amount,
				paid: false,
				issueDate: Date.now(),
				payableBy,
				_user: req.user.id,
			}).save()
			res.send(invoice.data)
			console.log(invoiceItem, stripeInvoice)
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})

	// Get invoices
	app.get('/api/invoices', async (req, res) => {
		if (!req.user) return
		try {
			const invoices = await Invoice.find({ _user: req.user.id })
			res.send(invoices)
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})

	// Get customers
	app.get('/api/customers', async (req, res) => {
		try {
			const customers = await Customer.find({ _user: req.user._id })
			res.send(customers)
			return
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})
}
