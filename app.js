import morgan, { token } from 'morgan'
import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const port = 3000
import route from './route.js'

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
token('date', (req, res) => {
  return new Date()
})
app.use(cors(corsOptions))
app.use(json());
app.use(morgan(':remote-addr - :remote-user - :date - :method - :url - :status - :res[content-length] - :response-time ms'))
app.use('/api', route)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})