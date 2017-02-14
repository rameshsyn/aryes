import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import expressReactViews from 'express-react-views'
import morgan from 'morgan'
import { join } from 'path'
import routes from './controllers'

const app = express()
const port = process.env.PORT || 4000

// Development Mode

if (process.env.NODE_ENV === 'development') {
  // Webpack Hot reload
  const webpack = require('webpack')
  const webpackConfig = require('../webpack.client')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true
    }
  }))
  app.use(webpackHotMiddleware(compiler))

  // Logger
  app.use(morgan('dev'))
}

// View Engine setup

app.set('views', join(__dirname, 'views'))
app.set('view engine', 'jsx')
app.engine('jsx', expressReactViews.createEngine({
  beautify: process.env.NODE_ENV === 'development',
  babel: {
    presets: ['es2015', 'stage-3', 'react'],
    plugins: [
      ['transform-runtime'],
      ['transform-class-properties', { spec: true }],
      ['transform-es2015-classes']
    ]
  }
}))

// Middlewares

app.use(compression({ level: 9, threshold: 0, filter: () => true }))
app.use(bodyParser.json({ limit: '1mb' }))
app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))
app.use('/static', express.static('./build'))

// Routes

app.use('/', routes)

// Server Listening ...
app.listen(port, (err) => {
  if (err) throw err
  console.log(`App is running at http://localhost:${port}`)
})

