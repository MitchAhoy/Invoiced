const { createProxyMiddleware } = require("http-proxy-middleware")
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google", "/test", "/api/current_user"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  )
}