const { stripeSecretKey } = require('../../config/keys')
const Stripe = require('stripe')
const stripe = Stripe(stripeSecretKey)
const mongoose = require('mongoose')
const User = mongoose.model('user')

module.exports = (app) => {
	app.post('/stripe/create_account_hosted', async (req, res) => {
		
		if (req.user.verification.verificationURL && req.user.verification.destroyVerificationURL <= Date.now()) return
		try {
			const account = await stripe.accounts.create({
        		country: 'AU',
				type: 'express',
				requested_capabilities: ['card_payments', 'transfers', 'card_payments'],
			})

			const accountLink = await stripe.accountLinks.create({
				account: account.id,
				success_url: 'http://localhost:3000?success',
				failure_url: 'http://localhost:3000?failure',
				collect: 'eventually_due',
				type: 'account_onboarding',
			})

			const updateUserLink = await User.findByIdAndUpdate({_id: req.user._id}, {verification: {verificationURL: accountLink.url, destroyVerificationURL: accountLink.expires_at, verified: false } })

			res.send(updateUserLink)
			return updateUserLink
			
      
		} catch (err) {
			console.log(err)
			res.status(400)
			res.send({ error: err })
			return
		}
	})
}
