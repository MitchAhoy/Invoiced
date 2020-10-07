# Invoiced
An all-in-on invoice management application. Integrated with the Stripe API, users are able to create an account and send invoices to customers instantly, track the status of their invoices and receive payments. 

See the live application here: https://cryptic-shelf-98722.herokuapp.com/

## Tech stack

### Front end
- React
- Material-UI (including JSS)
- React Router DOM

### Back end
- Node.js
- Express

### Database
- MongoDB + Mongoose

### Deployment
- Heroku

## User Flow

### Onboarding
When a user first comes to the site they are able to login with their Google account.

Once they have successfully logged in, the user is then prompted to verify themselves so they can receive funds. This takes the user to Stripe's connect onboarding where they will enter all of their sensitive information and then be redirected back to the dashboard once the process has been successfully completed.

### Creating & Sending Invoices
The user can create an invoice from the dashboard by clicking the + in the bottom right of the page.

Here they will then need to create a customer and save them to their account. Once the customer has been created then can then go back to the invoice creation screen and fill in the form with the invoice details such as the amount, due date and description.

The user can then review the invoice and confirm the information before sending it.

The invoice is then sent to the email address of the customer 

*Please note that in this version of the application the invoice is not emailed as my Stripe account is unable to be activated due to me not having an ABN and business information to activate the account. If I had a real business ABN then emails would be sent to the customer when an invoice is created*

### Managing Invoices
Once an invoice has been sent the user can then see it in their dashboard along with the status of the invoice.

The user can filter the invoices by status to see if an invoice is open, paid or void.

By clicking the 'MORE' button for an invoice a user can retrieve the payment link, download the PDF invoice or void the invoice.
