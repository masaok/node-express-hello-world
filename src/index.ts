import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'

import routes from './api/routes'
import 'regenerator-runtime/runtime.js'
// import { cache } from './utils/caching'

// Import .env environment variables
// https://github.com/motdotla/dotenv/issues/89#issuecomment-139372079
dotenv.config()

// const HOST = '0.0.0.0'
// const { PORT } = process.env
const PORT = 4000
const KEEP_ALIVE_INTERVAL = 5000

const app = express()
app.use(cors())

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

routes(app)

// Allow CORS on specific handlers
// https://vercel.com/support/articles/how-to-enable-cors#enabling-cors-in-a-single-node.js-serverless-function
const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

const status = {
  message: `Node / Express / TypeScript server running on port ${PORT}`,
}

const handler = (req, res) => {
  res.json(status)
}

app.get('/', allowCors(handler))

// https://expressjs.com/en/api.html#app.listen
app.listen(PORT, () => {
  const now = new Date()
  console.info(
    `${now.toLocaleString()} Server running on port ${PORT}, keep-alive every ${KEEP_ALIVE_INTERVAL} ms`
  )
})
