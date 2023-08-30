const morgan = require('morgan')
const moment = require('moment-timezone');
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 3000
const route = require('./route.js')

const corsOptions = {
  origin: 'http://localhost:5500',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
morgan.token('date', (req, res, tz) => {
  return moment().tz(tz).format('YYYY-MM-DD HH:mm:ss');
})
app.use(cors(corsOptions))
app.use(express.json());
app.use(morgan(':remote-addr - :remote-user :date[Asia/Taipei] :method :url :status :res[content-length] - :response-time ms'))
app.use('/api', route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})