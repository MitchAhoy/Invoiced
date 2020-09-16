const { stripeSecretKey } = require('../../config/keys')
const Stripe = require('stripe')
const stripe = Stripe(stripeSecretKey)
const mongoose = require('mongoose')
const User = mongoose.model('user')
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
					'card_payments',
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
		(req, res) => {
			console.log(req.body)
			console.log(req.user)
			res.send({})
		}
	)

	app.post('/stripe/stripe_verification', async (req, res) => {
		console.log(req.body)

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

	app.post('/stripe/create_customer', async (req,res) => {
		const customer = await stripe.customers.create(
			{email: req.body.customerEmail},
			{stripeAccount: req.user.stripeAcct}
		)

		const account = await stripe.accounts.retrieve(req.user.stripeAcct)

		console.log(customer, account)
		res.send({customer, account})
	})

	app.post('/stripe/invoice/create', async (req, res) => {

	})
}
