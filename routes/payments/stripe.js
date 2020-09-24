const { stripeSecretKey } = require('../../config/keys')
const Stripe = require('stripe')
const stripe = Stripe(stripeSecretKey)
const mongoose = require('mongoose')
const User = mongoose.model('user')
const Customer = mongoose.model('customer')
const Invoice = mongoose.model('invoice')
const bodyParser = require('body-parser')

module.exports = (app) => {
	app.post('/stripe/create_account_hosted', async (req, res) => {
		if (req.user.verified) {
			res.send('user already verified')
			return
		}

		try {

			const account = await stripe.accounts.create({
				country: 'AU',
				type: 'express',
				requested_capabilities: [
					'transfers',
					'card_payments',
				],
			})

			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				refresh_url: 'http://localhost:3000/reauth',
				return_url: `http://localhost:3000/verification-success?client=${req.user.googleId}&acct=${account.id}`,
				type: 'account_onboarding',
				collect: 'eventually_due',
			})


			const updateUserLink = await User.findByIdAndUpdate(
				{ _id: req.user._id },
				{
					verification: {
						verificationURL: accountLink.url,
						destroyVerificationURL: accountLink.expires_at,
						verified: false,
					},
				}
			)

			res.send(updateUserLink)
			return updateUserLink
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})

	app.post(
		'/stripe/webhooks',
		bodyParser.raw({ type: 'application/json' }),
		async (req, res) => {
			try {
				const { type } = req.body

				switch(type) {
					case 'invoice.paid' : {
						await Invoice.findOneAndUpdate(
							{ invoiceId: req.body.data.object.id },
							{ status: req.body.data.object.status },
							{ new: true },
							(err, updated) => console.log(err, updated)
						)
					}
				}
				res.status(200)
				res.send({})
			} catch (err) {
				console.log(err)
				res.status(400)
				res.send({ error: err })
				return
			}
		}

	)

	app.post('/stripe/stripe_verification', async (req, res) => {

		try {
			const verifyUser = await User.findByIdAndUpdate(
				{ _id: req.user._id },
				{ verified: true, stripeAcct: req.body.acct },
				{ new: true },
				(err, updated) => console.log(err, updated)
			)

			res.send(verifyUser)
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})

	app.post('/stripe/create_customer', async (req, res) => {
		const { customerName, customerEmail, customerAddress } = req.body

		try {
			const customer = await stripe.customers.create(
				{ email: customerEmail },
				{ stripeAccount: req.user.stripeAcct }
			)

			const saveCustomer = await new Customer({
				_user: req.user._id,
				name: customerName,
				email: customerEmail,
				address: customerAddress,
				stripeID: customer.id
			}).save()

			console.log({ customer, saveCustomer })
			res.send({ customer, saveCustomer })
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})

	app.post('/stripe/create_invoice', async (req, res) => {

	})


}
