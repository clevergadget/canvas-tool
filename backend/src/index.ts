import cors from 'cors'
import express from 'express'
import { pool } from './db'

const app = express()
app.use(cors());

const port = process.env.PORT || 3001

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ status: 'ok', db: 'ok' })
  } catch (e) {
    res.status(500).json({ status: 'error', db: 'unreachable' })
  }
})

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})
