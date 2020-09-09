const mongoose = require('mongoose')
const Invoice = mongoose.model('invoice')

module.exports = (app) => {
    // Save invoice to database
    app.post('/api/new_invoice', async (req, res) => {

        try {
            const { firstName, lastName, email, deliverables, amount} = req.body

            const invoice = await new Invoice({
                firstName: firstName,
                lastName: lastName,
                email: email,
                deliverables: deliverables,
                amount: amount,
                paid: false,
                _user: req.user.id
            }).save()
            res.send(invoice.data)

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
            const invoices = await Invoice.find({_user: req.user.id})
            res.send(invoices)
        } catch (err) {
            console.log(err)
			res.status(400)
			res.send({ error: err })
			return
        }

    })
}