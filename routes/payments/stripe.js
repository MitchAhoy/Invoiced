const { stripeSecretKey } = require('../../config/keys')
const Stripe = require('stripe')
const stripe = Stripe(stripeSecretKey)
const mongoose = require('mongoose')
const User = mongoose.model('user')
const bodyParser = require('body-parser')

module.exports = (app) => {
	app.post('/stripe/create_account_hosted', async (req, res) => {
		if (
			req.user.verification.verified &&
			req.user.verification.destroyVerificationURL <= Date.now()
		)
			return
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

		res.send('verifying..')
		// const user = User.find({_id: req.user._id})

		// try {
		//     const verifyUser = await User.findByIdAndUpdate({_id: req.user._id}, {...user, verification: {verified: true}, stripeAcct: req.body.clientVerification.acct})
		//     res.send(`${user.firstName} is verified`)
		// } catch (err) {
		//     console.log(err)
		// 	res.status(400)
		// 	res.send({ error: err })
		// 	return
		// }
	})
}
