const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/test", "/api/current_user", "/stripe/create_account_hosted", "/api/new_invoice", "/stripe/stripe_verification"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  )
}