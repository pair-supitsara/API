import morgan from 'morgan'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import route from './route.js'
const app = express()
const port = 8080
import bodyParser from 'body-parser'
import path from 'path'

app.use(cors({ origin: '*', optionsSuccessStatus: 200 }))
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' })); // Adjust limit as needed

morgan.token('date', (req, res) => new Date())
app.use(morgan(':remote-addr - :remote-user - :date - :method - :url - :status - :res[content-length] - :response-time ms'))

app.use('/api', route)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})