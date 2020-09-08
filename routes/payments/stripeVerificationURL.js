// const { stripeSecretKey } = require('../../config/keys')
// const Stripe = require('stripe')
// const stripe = Stripe(stripeSecretKey)
// const mongoose = require('mongoose')
// const User = mongoose.model('user')

// module.exports = stripeVerificationURL = () => {
//     console.log(req.user)
//     if (req.user.onboardingLink) return
//     try {
//         const account = await stripe.accounts.create({
//             country: 'AU',
//             type: 'express',
//             requested_capabilities: ['card_payments', 'transfers', 'card_payments'],
//         })

//         const accountLink = await stripe.accountLinks.create({
//             account: account.id,
//             success_url: 'http://localhost:3000?success',
//             failure_url: 'http://localhost:3000?failure',
//             collect: 'eventually_due',
//             type: 'account_onboarding',
//         })

//         const updateUserLink = await User.findOneAndUpdate({_id: require.user.id}, {verificationURL: accountLink.url}).save()


//           res.send(updateUserLink)
//           return updateUserLink

  
//     } catch (err) {
//         console.log(err)
//         res.status(400)
//         res.send({ error: err })
//         return
//     }
// }