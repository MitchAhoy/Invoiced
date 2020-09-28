const mongoose = require('mongoose')
const Invoice = mongoose.model('invoice')
const Customer = mongoose.model('customer')
const { stripeSecretKey } = require('../config/keys')
const Stripe = require('stripe')
const stripe = Stripe(stripeSecretKey)

module.exports = (app) => {
	app.post('/api/new_invoice', async (req, res) => {
		
		try {
			const { customer, description, amount, payableBy } = req.body
			const convertCentsToDollars = (amount * 100)
			console.log(convertCentsToDollars)

			const product = await stripe.products.create({
				name: description,
			}, { stripeAccount: req.user.stripeAcct })

			const price = await stripe.prices.create({
				unit_amount: convertCentsToDollars,
				currency: 'aud',
				product: product.id,
			}, { stripeAccount: req.user.stripeAcct })

			const invoiceItem = await stripe.invoiceItems.create({
				customer,
				price: price.id,
			}, { stripeAccount: req.user.stripeAcct })

			const stripeInvoice = await stripe.invoices.create(
				{
				customer,
				collection_method: 'send_invoice',
				due_date: new Date(payableBy)
				}, 
				{ stripeAccount: req.user.stripeAcct }
			)

			const sendInvoice = await stripe.invoices.sendInvoice(stripeInvoice.id, { stripeAccount: req.user.stripeAcct })

			const invoice = await new Invoice({
				customer,
				invoiceId: sendInvoice.id,
				customerEmail: sendInvoice.customer_email,
				description,
				amount: convertCentsToDollars,
				status: sendInvoice.status,
				issueDate: sendInvoice.created,
				payableBy: sendInvoice.due_date,
				invoiceUrl: sendInvoice.hosted_invoice_url,
				invoicePdf: sendInvoice.invoice_pdf,
				_user: req.user.id,
			}).save()
			res.send(invoice)
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})

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

	app.post('/api/invoices/:id/void', async (req, res) => {

		const invoiceToVoid = req.params.id

		try {
			const voidInvoice = await stripe.invoices.voidInvoice(invoiceToVoid, { stripeAccount: req.user.stripeAcct })
			const updateInvoiceStatus = await Invoice.findOneAndUpdate({invoiceId: invoiceToVoid}, {status: voidInvoice.status}, {new: true}, (err, updated) => console.log(err, updated))
			res.send(updateInvoiceStatus)
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
		

	})

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
