const serverless = require('serverless-http')
const express = require('express')
const { createPageRenderer } = require('vite-plugin-ssr')

const isProduction = true //process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`
const renderPage = createPageRenderer({ isProduction, root })

const app = express()
app.set('env', 'production')

app.use(express.static(`${root}/dist/client`, {
  index: false,
  maxAge: '300000'
}))

app.get('*', async (req, res, next) => {
  const url = req.originalUrl
  const pageContextInit = { url }
  const pageContext = await renderPage(pageContextInit)
  const { httpResponse } = pageContext
  if (!httpResponse) return next()
  const { body, statusCode, contentType } = httpResponse
  res.status(statusCode).type(contentType).send(body)
})

module.exports.handler = serverless(app)
