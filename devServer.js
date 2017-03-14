const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('./webpack.config.dev')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const app = express()
const compiler = webpack(config)

const NODE_HOST = process.env.NODE_HOST || 'localhost'
// const NODE_HOST = process.env.NODE_HOST || '0.0.0.0'
const NODE_PORT = process.env.NODE_PORT || 3000

app.use(webpackDevMiddleware(compiler, {
  noInfo: false,
  quiet: false,
  publicPath: config.output.publicPath,
}))

app.use(webpackHotMiddleware(compiler, {
  log: _ => {},
}))

// '/public' route is automatically used by webpack middleware
app.use('/public', express.static('public'))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(NODE_PORT, NODE_HOST, err => {
  if (err) {
    console.log(err)
    return
  }

  console.log(`Listening at http://${NODE_HOST}:${NODE_PORT}`)
})
